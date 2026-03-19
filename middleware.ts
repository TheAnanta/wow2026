import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
    initializeApp({
        credential: cert({
            // Replace with your Firebase Admin credentials
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

const db = getFirestore();

export async function middleware(req: NextRequest) {
    // You should extract the user ID from cookies, headers, or session
    const uid = req.cookies.get("uid")?.value;
    if (!uid) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const userDoc = await db.collection("users").doc(uid).get();
    const userData = userDoc.data();

    if (!userData) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (userData.role !== "staff" && userData.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow access
    return NextResponse.next();
}

// Optionally, specify which routes to match
export const config = {
    matcher: ["/admin/:path*"],
};