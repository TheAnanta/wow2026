/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Loader from "@/components/LoadingAnimation/page";
import mainData from "@/data/config.json";

// dynamic import for SSR safety
const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  { ssr: false }
);

export default function ScanQRPage() {
  useEffect(() => {
    document.title = `Scan QR - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Scan QR - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Scan QR - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Handle QR scan result
  const handleScan = (detectedCodes: any[]) => {
    if (detectedCodes.length === 0) return;

    setIsLoading(true);
    const username = detectedCodes[0]?.rawValue;
    if (username && username !== result) {
      setResult(username);
      router.push(`/c/${username}`);
    }
  };

  // Handle scanner errors
  const handleError = (err: unknown) => {
    console.error(err);
    if (typeof err === "object" && err !== null && "name" in err) {
      const errorName = (err as any).name;
      if (errorName === "NotAllowedError")
        setError("Camera access permission is required.");
      else if (errorName === "NotFoundError")
        setError("No camera found on this device.");
      else if (errorName === "NotReadableError")
        setError("The camera is already in use.");
      else setError((err as any).message || "Unknown error occurred.");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          style={{ padding: "20px" }}
          className="w-full flex flex-col justify-center items-center"
        >
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
          <p>Please Scan the QR</p>

          <div
            style={{
              backgroundColor: "#e8eaed",
              borderRadius: "24px",
              padding: "50px 15px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
            }}
          >
            <Scanner
              onScan={handleScan}
              onError={handleError}
              constraints={{ facingMode: "environment" }}
              styles={{
                container: {
                  width: "300px",
                  height: "300px",
                  borderRadius: "24px",
                  overflow: "hidden",
                },
                video: { width: "100%", height: "100%", objectFit: "cover" },
              }}
              scanDelay={300}
            />

            <h3>Scanned: @{result}</h3>
          </div>
        </div>
      )}
    </>
  );
}
