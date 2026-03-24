"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { doc, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UserData {
  displayName: string;
  email: string;
  phoneNumber?: string;
  feedbackStatus?: boolean;
  // Add other fields as needed
}

// Winners list with phone numbers
const winnersPhone = [
  "9059145216",
  "7989817938",
  "7674834094",
  "8686868686",
];

export default function CertificatePage() {
  const user = useAuthContext();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    comments: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    comments?: string;
  }>({});

  const [certificateType, setCertificateType] = useState<
    "participation" | "achievement"
  >("participation");
  const [loading, setLoading] = useState(false);

  const [isWinner, setIsWinner] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Global protection against right-click and keyboard shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S, Ctrl+U, F12, etc.
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "u" || e.key === "p")) ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "C")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Fetch user data from Firestore when user is authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          setUserLoading(true);
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;

            // Check if user is a winner by comparing phone number
            const userPhoneNumber = data.phoneNumber?.replace(/\s/g, "") || "";
            const isUserWinner =
              winnersPhone.includes(userPhoneNumber);
            setIsWinner(isUserWinner);

            // Check feedback status from user document
            setFeedbackSubmitted(data.feedbackStatus || false);

            // Pre-fill the feedback form with user data
            setFeedback({
              name: data.displayName || "",
              email: data.email || user.email || "",
              comments: "",
            });
          } else {
            // If user document doesn't exist, use auth user data
            setFeedback({
              name: user.displayName || "",
              email: user.email || "",
              comments: "",
            });
            setIsWinner(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to auth user data
          setFeedback({
            name: user.displayName || "",
            email: user.email || "",
            comments: "",
          });
          setIsWinner(false);
        } finally {
          setUserLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleDownloadClick = (
    e: React.MouseEvent,
    type: "participation" | "achievement"
  ) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to download certificates");
      return;
    }

    // Check if user is trying to access achievement certificate but is not a winner
    if (type === "achievement" && !isWinner) {
      alert("Achievement certificate is only available for hackathon winners.");
      return;
    }

    // Check if user has already submitted feedback
    if (!feedbackSubmitted) {
      setCertificateType(type);
      setShowFeedback(true);
    } else {
      // User has already submitted feedback, allow direct download
      downloadCertificate(type);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!feedback.name.trim()) newErrors.name = "Name is required";
    if (!feedback.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(feedback.email))
      newErrors.email = "Invalid email";
    if (!feedback.comments.trim()) newErrors.comments = "Feedback is required";
    return newErrors;
  };

  const saveFeedbackToFirestore = async () => {
    if (!user?.uid) return;

    try {
      const feedbackData = {
        uid: user.uid,
        name: feedback.name,
        email: feedback.email,
        comments: feedback.comments,
        timestamp: new Date().toISOString(),
      };

      // Save to feedback collection with auto-generated ID
      await addDoc(collection(db, "feedback"), feedbackData);

      // Update user document with feedback status
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        feedbackStatus: true
      });

      // Update local state
      setFeedbackSubmitted(true);

      console.log("Feedback saved successfully");
    } catch (error) {
      console.error("Error saving feedback:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        await saveFeedbackToFirestore();
        setTimeout(() => {
          setShowFeedback(false);
          setLoading(false);
        }, 1200);
      } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Error submitting feedback. Please try again.");
        setLoading(false);
      }
    }
  };

  const handleModalClose = () => {
    setShowFeedback(false);
  };

  const downloadCertificate = (type: "participation" | "achievement") => {
    const certificatePath =
      type === "participation"
        ? "/images/Certificate-Participation.png"
        : "/images/Certificate-Achievement.png";

    const certificateName =
      type === "participation"
        ? "GDGoC_WoW_AP_2026_Participation_Certificate.png"
        : "GDGoC_WoW_AP_2026_Achievement_Certificate.png";

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = certificatePath;
    link.download = certificateName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Show loading or sign-in prompt if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Sign In Required
          </h1>
          <p className="text-gray-600">
            Please sign in to access your certificates.
          </p>
        </div>
      </div>
    );
  }

  // Show loading while fetching user data
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            {!feedbackSubmitted ? (
              <>
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  onClick={handleModalClose}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">
                  Feedback Form
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Required for{" "}
                  {certificateType === "participation"
                    ? "Participation"
                    : "Achievement"}{" "}
                  Certificate.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1" htmlFor="name">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring ${errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      value={feedback.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1" htmlFor="email">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-3 py-2 border rounded text-gray-500 bg-gray-100 focus:outline-none focus:ring ${errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      value={feedback.email}
                      readOnly
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 mb-1"
                      htmlFor="comments"
                    >
                      Feedback<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={3}
                      className={`w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring ${errors.comments ? "border-red-500" : "border-gray-300"
                        }`}
                      value={feedback.comments}
                      onChange={handleChange}
                      placeholder="Please share your experience and feedback about the event..."
                    />
                    {errors.comments && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.comments}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full font-semibold py-2 px-4 rounded transition-colors duration-200 ${loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                  >
                    {loading ? "Submitting..." : "Submit Feedback"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                  onClick={handleModalClose}
                  aria-label="Close"
                >
                  &times;
                </button>
                <div className="text-center py-8">
                  <h4 className="text-lg font-semibold text-green-600 mb-2">
                    Thank you for your feedback!
                  </h4>
                  <p className="text-gray-700 mb-4">
                    You can now download your certificate.
                  </p>
                  <button
                    className={`flex items-center justify-center gap-2 mx-auto ${certificateType === "participation"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-green-600 hover:bg-green-700"
                      } text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200`}
                    onClick={() => {
                      setShowFeedback(false);
                      downloadCertificate(certificateType);
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download{" "}
                    {certificateType === "participation"
                      ? "Participation"
                      : "Achievement"}{" "}
                    Certificate
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Main Certificate Page */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Certificates
            </h1>
            <p className="text-lg text-gray-600 dark:text-white">
              Download your certificates for GDGoC WoW AP 2026
            </p>
            {isWinner && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-lg">
                <p className="text-green-800 font-semibold">
                  🏆 Congratulations! You&apos;re a hackathon winner!
                </p>
                <p className="text-green-700 text-sm">
                  You&apos;ve achieved both participation and achievement certificates.
                </p>
              </div>
            )}
          </div>

          <div
            className={`grid gap-8 ${isWinner ? "md:grid-cols-2" : "max-w-2xl mx-auto"
              }`}
          >
            {/* Participation Certificate */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Certificate of Participation
                </h2>
                <p className="text-gray-600 mb-6">
                  This is to certify that you have successfully participated in
                  GDGoC WoW AP 2026
                </p>
                <div className="border-2 border-gray-900 rounded-lg p-4 mb-6 bg-gray-100 relative">
                  <div className="relative w-full h-64">
                    <Image
                      src="/images/Certificate-Participation.png"
                      alt="Certificate of Participation"
                      fill
                      className="object-contain rounded select-none pointer-events-none"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* Overlay to prevent interactions */}
                    <div
                      className="absolute inset-0 bg-transparent"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onDrop={(e) => e.preventDefault()}
                    ></div>
                    {/* Watermark overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-black bg-opacity-20 rounded-lg px-4 py-2">
                        <p className="text-white font-semibold text-sm flex items-center gap-2">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                              <path
                                d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>
                          Preview
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    onClick={(e) => handleDownloadClick(e, "participation")}
                    disabled={showFeedback}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Participation Certificate
                  </button>
                </div>
              </div>
            </div>

            {/* Achievement Certificate - Only for winners */}
            {isWinner && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Certificate of Achievement
                  </h2>
                  <p className="text-gray-600 mb-6">
                    For hackathon winners and outstanding performers at GDGoC
                    WoW AP 2026
                  </p>
                  <div className="border-2 border-gray-900 rounded-lg p-4 mb-6 bg-gray-100 relative">
                    <div className="relative w-full h-64">
                      <Image
                        src="/images/Certificate-Achievement.png"
                        alt="Certificate of Achievement"
                        fill
                        className="object-contain rounded select-none pointer-events-none"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      {/* Overlay to prevent interactions */}
                      <div
                        className="absolute inset-0 bg-transparent"
                        onContextMenu={(e) => e.preventDefault()}
                        onDragStart={(e) => e.preventDefault()}
                        onDrop={(e) => e.preventDefault()}
                      ></div>
                      {/* Watermark overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-black bg-opacity-20 rounded-lg px-4 py-2">
                          <p className="text-white font-semibold text-sm flex items-center gap-2">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>{" "}
                                <path
                                  d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>{" "}
                              </g>
                            </svg>
                            Preview
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      onClick={(e) => handleDownloadClick(e, "achievement")}
                      disabled={showFeedback}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download Achievement Certificate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
