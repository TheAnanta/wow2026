/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import mainData from "@/data/config.json";
import quizDataJson from "@/data/diwali-quiz.json";
import { useAuthContext } from "@/context/AuthContext";
import BadgeAwardedNotification from "@/components/BadgeAnimation";
import arcadeJSON from "@/data/arcade.json";

const loadInitialQuizData = (initialData: any, userAnswers?: any) => {
  if (typeof window === "undefined")
    return initialData.map((q: any) => ({ ...q, selectedOption: null }));

  const savedAnswers = JSON.parse(
    userAnswers || localStorage.getItem("userAnswers") || "[]"
  );
  console.log("Saved Answers:", savedAnswers);
  return initialData.map((question: any) => {
    const savedAnswer = [...savedAnswers].find(
      (ans: any) => ans.question === question.question
    );
    return {
      ...question,
      selectedOption: savedAnswer ? savedAnswer.selectedOption : null,
    };
  });
};

function DiwaliQuizPage() {
  useEffect(() => {
    document.title = `Diwali Quiz - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Diwali Quiz - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Diwali Quiz - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const [showAnswers, setShowAnswers] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [userScore, setUserScore] = useState(-1);
  const [quizData, setQuizData] = useState(loadInitialQuizData(quizDataJson));
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(true);
  const [badgeToShow, setBadgeToShow] = useState<any>(null);
  const arcadeData = arcadeJSON.find(
    (arcade: any) => arcade.badge.id === "diwali"
  )?.badge;
  const [badgeAwarded, setBadgeAwarded] = useState(false);
  const user = useAuthContext();
  useEffect(() => {
    if (typeof window === "undefined") return;

    let savedQuizCompleted = localStorage.getItem("quizCompleted") === "true";
    if (!savedQuizCompleted) {
      // Fetch data from firestore if quiz is completed
      if (user && user.uid && db) {
        getDoc(doc(db, "users", user.uid, "arcade", "diwali")).then(
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setShowAnswers(data.quizCompleted || false);
              setQuizData(
                loadInitialQuizData(quizDataJson, data.userAnswers || [])
              );
              setUserScore(data.userScore || -1);
              setCountdown(parseInt(data.countdown || "300"));
              setIsQuizSubmitted(data.quizCompleted || false);
              savedQuizCompleted = data.quizCompleted || false;
              console.log(savedQuizCompleted);
              if (data.quizCompleted) {
                setBadgeToShow(arcadeData);
                setBadgeAwarded(true);
              }
              // Save to localStorage for quick access
              localStorage.setItem("quizCompleted", "true");
              localStorage.setItem("userScore", data.userScore.toString());
              localStorage.setItem(
                "userAnswers",
                JSON.stringify(data.userAnswers || [])
              );
              localStorage.setItem("countdown", data.countdown.toString());
            } else {
              let timerId: any;
              if (!savedQuizCompleted) {
                setIsQuizSubmitted(false);
                timerId = setInterval(() => {
                  setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                      clearInterval(timerId);
                      return 0;
                    }
                    return prevCountdown - 1;
                  });
                }, 1000);
              }

              return () => {
                if (timerId) {
                  clearInterval(timerId);
                }
              };
            }
          }
        );
      }
    } else {
      const savedCountdown =
        parseInt(localStorage.getItem("countdown") || "300") || 300;
      const savedUserScore =
        parseInt(localStorage.getItem("userScore") || "-1") || -1;

      setShowAnswers(savedQuizCompleted);
      setCountdown(savedCountdown);
      setUserScore(savedUserScore);

      if (savedQuizCompleted) {
        setQuizData(loadInitialQuizData(quizDataJson));

        setBadgeToShow(arcadeData);
        setBadgeAwarded(true);
      }
      setIsQuizSubmitted(savedQuizCompleted);
      let timerId: any;
      if (!savedQuizCompleted) {
        setIsQuizSubmitted(false);
        timerId = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(timerId);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);
      }

      return () => {
        if (timerId) {
          clearInterval(timerId);
        }
      };
    }
  }, [quizDataJson]);

  useEffect(() => {
    if (countdown <= 0 && !showAnswers) {
      setShowAnswers(true);
    }
  }, [countdown, showAnswers]);

  useEffect(() => {
    if (isQuizSubmitted) return;
    if (showAnswers && countdown <= 0) {
      handleSubmitQuiz();
    } else if (showAnswers && countdown > 0) {
      handleSubmitQuiz();
    }
  }, [showAnswers, countdown]);

  const handleOptionSelect = (questionId: any, selectedValue: any) => {
    if (showAnswers) return;

    setQuizData(
      quizData.map((q: any) =>
        q.question === questionId ? { ...q, selectedOption: selectedValue } : q
      )
    );
  };

  const handleSubmitQuiz = async () => {
    setShowAnswers(true);

    const calculatedScore = quizData.reduce((score: any, question: any) => {
      if (question.selectedOption === question.correct) {
        return score + 1;
      }
      return score;
    }, 0);

    setUserScore(calculatedScore);

    const userAnswersToSave = quizData.map((q: any) => ({
      question: q.question,
      selectedOption: q.selectedOption || null,
    }));

    if (typeof window !== "undefined") {
      localStorage.setItem("userScore", calculatedScore.toString());
      localStorage.setItem("userAnswers", JSON.stringify(userAnswersToSave));
      localStorage.setItem("quizCompleted", "true");
      localStorage.setItem("countdown", countdown.toString());
    }

    if (user && user.uid && db) {
      try {
        await setDoc(
          doc(db, "users", user.uid, "arcade", "diwali"),
          {
            uid: user.uid,
            userAnswers: JSON.stringify(userAnswersToSave),
            userScore: calculatedScore,
            timestamp: new Date(),
            quizCompleted: true,
            countdown: countdown.toString(),
          },
          { merge: true }
        );
        // Update the user's arcade score
        const userArcadeScore =
          (await getDoc(doc(db, "users", user.uid))).data()?.arcadeScore || 0;
        await setDoc(
          doc(db, "users", user.uid),
          {
            arcadeScore: userArcadeScore + calculatedScore * 10, // Assuming each point is worth 10 in arcade score
          },
          { merge: true }
        );
        // alert(
        //   "You've just earned the Diwali Dhamaka badge. Check it out on your profile."
        // );
        setBadgeToShow(arcadeData);
        setBadgeAwarded(true);
      } catch (e) {
        console.error("Error writing to Firebase:", e);
        alert("Failed to save quiz results.");
      }
    } else {
      console.warn(
        "User not logged in or Firebase DB not available, results not saved to Firestore."
      );
      alert("Quiz completed! Log in to save your score.");
    }

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    console.log("User Answers:", userAnswersToSave);
    console.log("Calculated Score:", calculatedScore);
  };

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <>
      <div className="max-w-[1240px] mx-auto mt-5 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 mb-4">
            <img
              src="/images/arcade/diwali-dhamaka.png"
              alt="Diwali Dhamaka Banner"
              className="h-72 w-full rounded-3xl object-cover object-left"
            />
          </div>
          <div className="w-full md:w-auto px-4 mb-4 md:mb-0 flex-grow">
            <h2 className="text-2xl font-semibold mb-2 google-font mt-4">
              Light Up the Leaderboard ✨
            </h2>
            <p className="max-w-prose google-font">
              Ready to shine brighter than a diya 🪔?
              <br />
              From mythology to traditions, put your Diwali knowledge to the
              test in this exciting quiz and see if you have what it takes to
              conquer the leaderboard!. Climb the leaderboard and win amazing
              prizes!
            </p>
          </div>
          <div
            className="w-full sm:w-auto md:w-1/4 px-4 ml-0 md:ml-4 mb-3 md:mb-0
            border-2 border-[#202023] p-4 py-6 rounded-3xl flex justify-center items-center self-start shrink-0"
          >
            <p className="text-6xl google-font">{formatTime(countdown)}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="inline-flex py-1 px-1.5 border border-[#202023] rounded-full gap-3 items-center">
            <img
              src="/images/team/manas.jpg"
              alt="Manas Malla"
              className="w-7 h-7 object-cover rounded-full"
            />
            <p className="mr-2 text-sm font-semibold google-font">
              Manas Malla
            </p>
          </div>
          <div className="inline-flex py-1 px-1.5 border border-[#202023] rounded-full gap-3 items-center">
            <img
              src="/images/team/kavya.png"
              alt="Kavya Chandana"
              className="w-7 h-7 object-cover rounded-full"
            />
            <p className="mr-2 text-sm font-semibold google-font">
              Kavya Chandana
            </p>
          </div>
        </div>
        {showAnswers && (
          <div className="mt-6 w-fit mx-auto border-2 border-[#202023] rounded-xl bg-gray-200 dark:bg-gray-700 p-4 google-font">
            Score: {(userScore == -1 ? 0 : 0) * 10}/{quizData.length * 10}
          </div>
        )}
        <form
          onSubmit={handleSubmitQuiz}
          className="mt-6 mx-auto flex flex-col items-start google-font"
        >
          {quizData.map((item: any, index: any) => (
            <div key={index} className="flex flex-col items-start mb-2">
              <div className="mb-3">
                <p className="text-lg font-bold mb-2">{item.question}</p>
                {item.options.map((option: any, optionIndex: any) => (
                  <div
                    key={optionIndex}
                    className="flex items-start gap-1 mb-1"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={`${item.question}-${optionIndex}`}
                        name={item.question}
                        value={option}
                        checked={item.selectedOption === option}
                        onChange={() =>
                          handleOptionSelect(item.question, option)
                        }
                        disabled={showAnswers}
                        className="form-radio text-blue-600"
                      />
                      <label
                        htmlFor={`${item.question}-${optionIndex}`}
                        className={`cursor-pointer ${
                          showAnswers && option === item.correct
                            ? "text-green-700 font-semibold"
                            : ""
                        }`}
                      >
                        {option}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              {showAnswers && item.trivia && (
                <div className="rounded-lg bg-[#c3ecf6] dark:text-black p-5 mt-1 mb-4 mx-2 flex gap-3 items-start">
                  <span className="text-xl material-symbols-outlined !font-semibold">
                    comic_bubble
                  </span>
                  <p className="max-w-prose leading-6">{item.trivia}</p>
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={showAnswers}
            className={`
              py-3 px-6 text-black mt-2 rounded
              text-base font-semibold
              ${
                showAnswers
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 transition duration-200 ease-in-out"
              }
            `}
          >
            {showAnswers ? "Submitted" : "Submit"}
          </button>
        </form>
      </div>
      <BadgeAwardedNotification
        isOpen={badgeAwarded}
        onClose={() => {
          setBadgeAwarded(false);
          setBadgeToShow(null);
        }}
        onDismiss={() => {
          setBadgeAwarded(false);
          setBadgeToShow(null);
        }}
        badgeName={badgeToShow?.name || "Unnamed Badge"}
        badgeIconUrl={`/images/arcade/badges/${badgeToShow?.image}`}
        badgeShareTitle={
          badgeToShow?.name
            ? `I just earned the ${badgeToShow.name} badge!`
            : "I earned a new badge!"
        }
        badgeShareDescription={
          badgeToShow?.description.earned || "Check out this awesome badge!"
        }
        badgePath={badgeToShow?.id}
        isLoading={false}
      />
    </>
  );
}

export default DiwaliQuizPage;
