'use client';
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { BadgeSuccess } from "@/components/registration/BadgeSuccess";
import { MaterialCheckout } from "@/components/payment/MaterialCheckout";
import { GroupInviteModal } from "@/components/payment/GroupInviteModal";
import { useAuth } from "@/context/AuthContext";
import { fetchTicketTiers, initiateCheckout, verifyPayment, fetchMyTickets, validateCoupon } from "@/services/registrationStubs";
import { analyticsService } from "@/services/analytics";

function PaymentPage() {
    const startTimeRef = useRef(Date.now());
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, profile, tickets, isUnregistered, isLoading } = useAuth();

    const hasFullPass = tickets?.some((t: any) =>
        (t.tier?.name || t.name || "").toLowerCase().includes("early bird") ||
        (t.tier?.name || t.name || "").toLowerCase().includes("regular") ||
        (t.tier?.name || t.name || "").toLowerCase().includes("attendee") ||
        (t.tier?.name || t.name || "").toLowerCase().includes("group") ||
        (t.tier?.name || t.name || "").toLowerCase().includes("ground")
    );

    const hasArcade = tickets?.some((t: any) =>
        (t.tier?.name || t.name || "").toLowerCase().includes("arcade") ||
        (t.tier?.name || t.name || "").toLowerCase().includes("wow")
    );

    const isSettlement = hasArcade && !hasFullPass;

    const league = (profile?.league || "BASIC").toUpperCase();
    let remainingPrice = 600;
    if (league === "PLATINUM") remainingPrice = 0;
    else if (league === "DIAMOND") remainingPrice = 50;
    else if (league === "GOLD") remainingPrice = 200;
    else if (league === "SILVER") remainingPrice = 300;
    else if (league === "BRONZE") remainingPrice = 470;
    else if (league === "BASIC") remainingPrice = 600;

    const settlementPrice = remainingPrice + 30;

    const [tiers, setTiers] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [earnedBadge, setEarnedBadge] = useState<string | null>(() => {
        if (typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
            searchParams.get('mock') === 'true') {
            return 'WOW 2026 - Attendee';
        }
        return null;
    });
    const [orderId, setOrderId] = useState<string | null>(() => {
        if (typeof window !== 'undefined' &&
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
            searchParams.get('mock') === 'true') {
            return 'order_Sg8MadWlL3f1Ty';
        }
        return null;
    });
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [lastOrderDetails, setLastOrderDetails] = useState<{ id: string, badgeName: string } | null>(null);
    const [isWOWPlus, setIsWOWPlus] = useState(false);

    // Mock/Auto-success detection
    useEffect(() => {
        if (typeof window !== 'undefined' && 
            (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && 
            searchParams.get('mockGroup') === 'true') {
            setShowGroupModal(true);
            setLastOrderDetails({ id: 'order_MOCK_GROUP_123', badgeName: 'WOW 2026 - Attendee' });
        }
    }, [searchParams]);

    useEffect(() => {
        if (isLoading || isProcessing) return;

        if (!user) {
            router.push('/register');
            return;
        }

        if (isUnregistered && !profile) {
            router.push('/register');
            return;
        }

        if (hasFullPass) {
            router.push('/?message=already_has_ticket');
            return;
        }

        const loadData = async () => {
            const tiersData = await fetchTicketTiers();
            setTiers(tiersData);

            // Auto-apply promo code if provided in URL
            const promo = searchParams.get('promo');
            if (promo) {
                try {
                    const tier = tiersData.find((t: any) => t.name.toLowerCase().includes('early') || t.name.toLowerCase().includes('arcade'));
                    const result = await validateCoupon(promo.toUpperCase(), tier?.id);
                    setCouponCode(promo.toUpperCase());
                    setDiscount(result.discount);
                } catch (err) {
                    console.error("Auto-apply promo failed", err);
                }
            }
        };
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile, user, isLoading, router, tickets]);

    const handlePurchase = async (tierId: string, badgeName?: string, isSettlementParam?: boolean, hasTshirtParam?: boolean) => {
        setIsProcessing(true);
        try {
            const tier = tiers.find(t => t.id === tierId);
            if (!tier) throw new Error('Ticket tier not found');

            const duration = (Date.now() - startTimeRef.current) / 1000;
            analyticsService.trackCheckoutActivity('select_tier', tier.name, 'initiated', duration);

            const checkoutData = await initiateCheckout(tier.id, couponCode, isSettlementParam, hasTshirtParam);
            
            if (checkoutData.is_free) {
                // 🚀 ZERO-AMOUNT BYPASS: Skip Razorpay
                setEarnedBadge(badgeName || tier.name);
                setOrderId(checkoutData.order_id);
                window.dispatchEvent(new CustomEvent('registrationSuccess'));
                setIsProcessing(false);
                return;
            }

            const options = {
                key: checkoutData.key_id,
                amount: checkoutData.amount,
                currency: checkoutData.currency,
                name: "GDG WOW 2026",
                description: `Purchase for ${tier.name}`,
                order_id: checkoutData.gateway_order_id,
                handler: async (response: any) => {
                    setIsProcessing(true);
                    try {
                        const verifiedData = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        if (tierId === 'clx_grouppass_006') {
                            // Use the internal order id (cuid) returned from /verify, not the Razorpay gateway id
                            const internalOrderId = verifiedData?.order?.id || response.razorpay_order_id;
                            setLastOrderDetails({ id: internalOrderId, badgeName: badgeName || tier.name });
                            setShowGroupModal(true);
                        } else {
                            setEarnedBadge(badgeName || tier.name);
                            setOrderId(response.razorpay_order_id);
                        }
                        window.dispatchEvent(new CustomEvent('registrationSuccess'));
                    } catch (err: any) {
                        alert(err.message || 'Payment verification failed.');
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: profile?.displayName || user?.displayName || undefined,
                    email: user?.email || undefined,
                    contact: (profile?.phone && profile.phone.length > 5) ? profile.phone : undefined,
                },
                theme: { color: "#2c5fd9" },
                modal: { ondismiss: () => setIsProcessing(false) }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            alert(err.message || 'Failed to initialize checkout.');
            setIsProcessing(false);
        }
    };

    const handleApplyCoupon = async (code: string) => {
        try {
            const tier = tiers.find(t => t.name.toLowerCase().includes('early') || t.name.toLowerCase().includes('arcade'));
            const result = await validateCoupon(code, tier?.id);
            setCouponCode(code);
            setDiscount(result.discount);
            return { success: true, discount: result.discount };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    if (isLoading) return null;

    if (earnedBadge) {
        return (
            <BadgeSuccess
                badgeName={earnedBadge}
                orderId={orderId}
                // couponCode={couponCode}
                onClose={() => {
                    setEarnedBadge(null);
                    setOrderId(null);
                    router.push('/explore');
                }}
            />
        );
    }

    return (
        <div className="w-full min-h-screen">
            <MaterialCheckout
                tiers={tiers}
                profile={profile}
                user={user}
                isProcessing={isProcessing}
                onPurchase={handlePurchase}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                discount={discount}
                onApplyCoupon={handleApplyCoupon}
                onBack={() => router.push('/register?update=true')}
                isWOWPlus={isWOWPlus}
                onToggleWOWPlus={() => setIsWOWPlus(!isWOWPlus)}
                initialIsGroupPass={
                  searchParams?.get('tier') === 'group' ||
                  profile?.intended_tier_id === 'clx_grouppass_006'
                }
                isSettlement={isSettlement}
                settlementPrice={settlementPrice}
                remainingPrice={remainingPrice}
            />



            {showGroupModal && lastOrderDetails && (
                <GroupInviteModal 
                    orderId={lastOrderDetails.id} 
                    isMock={typeof window !== 'undefined' && window.location.hostname === 'localhost' && searchParams.get('mockGroup') === 'true'}
                    onFinish={() => {
                        setShowGroupModal(false);
                        setEarnedBadge(lastOrderDetails.badgeName);
                        setOrderId(lastOrderDetails.id);
                    }}
                />
            )}
        </div>
    );
}

export default function SuspensefulPaymentPage() {
    return (
        <Suspense fallback={null}>
            <PaymentPage />
        </Suspense>
    );
}