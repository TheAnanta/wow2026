'use client';
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { BadgeSuccess } from "@/components/registration/BadgeSuccess";
import { MaterialCheckout } from "@/components/payment/MaterialCheckout";
import { useAuth } from "@/context/AuthContext";
import { fetchTicketTiers, initiateCheckout, verifyPayment, fetchMyTickets, validateCoupon } from "@/services/registrationStubs";
import { analyticsService } from "@/services/analytics";

function PaymentPage() {
    const startTimeRef = useRef(Date.now());
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, profile, tickets, isUnregistered, isLoading } = useAuth();

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

        const loadData = async () => {
            const tiersData = await fetchTicketTiers();
            setTiers(tiersData);
        };
        loadData();
    }, [profile, user, isLoading, router]);

    const handlePurchase = async (tierSearch: string, badgeName?: string) => {
        setIsProcessing(true);
        try {
            const tier = tiers.find(t => t.name.toLowerCase().includes(tierSearch.toLowerCase()));
            if (!tier) throw new Error('Ticket tier not found');

            const duration = (Date.now() - startTimeRef.current) / 1000;
            analyticsService.trackCheckoutActivity('select_tier', tierSearch, 'initiated', duration);
            
            const checkoutData = await initiateCheckout(tier.id, couponCode);

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
                        await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        setEarnedBadge(badgeName || tier.name);
                        setOrderId(response.razorpay_order_id);
                        window.dispatchEvent(new CustomEvent('registrationSuccess'));
                    } catch (err: any) {
                        alert(err.message || 'Payment verification failed.');
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: profile?.displayName || user?.displayName || "",
                    email: user?.email || "",
                    contact: profile?.phone || "",
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
            <div className="w-full min-h-screen bg-white flex flex-col items-center">
                <div className="w-full max-w-[800px] animate-fade-in">
                    <BadgeSuccess
                        badgeName={earnedBadge}
                        orderId={orderId}
                        onClose={() => {
                            setEarnedBadge(null);
                            setOrderId(null);
                            router.push('/explore');
                        }}
                    />
                </div>
            </div>
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
            />
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