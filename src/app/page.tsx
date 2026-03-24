/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import config from "@/data/config.json";
import sponsors from "@/data/sponsors.json";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Tooltip } from "react-tooltip";
import Carousel from "@/components/carousel";
import galleryImages from "@/data/gallery.json";
import swags from "@/data/swags.json";
import techStack from "@/data/techStack.json";
import navbarConfig from "@/data/navbar.json";
import { useAuthContext } from "@/context/AuthContext";
import Progress from "@/utils/progress";
import GetUserProgress from "@/utils/getUserProgress";
import TaskList from "@/components/todo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import testimonials from "@/data/testimonials.json";

function HeroBentoLeft({
  userProgress = Progress.noApplication,
}: {
  userProgress?: Progress;
}) {
  const user = useAuthContext();
  return (
    <div className="lg:w-[67%] min-h-[var(--custom-height-landing)] md:min-h-[unset] md:max-h-[unset] flex flex-col items-center md:items-end text-center md:text-start md:flex-row md:justify-between shrink-0 md:rounded-4xl md:border-2 border-black dark:border-gray-700 overflow-clip">
      <div className="max-w-96 md:p-16 md:pb-32 my-auto md:my-[unset]">
        <div className="md:hidden mx-auto w-max mb-3 md:mb-6">
          <img
            src={`/common/${
              navbarConfig.logo.dark_src || navbarConfig.logo.src
            }`}
            alt={navbarConfig.logo.alt}
            className="h-12 max-w-36 min-w-12 object-left dark:block hidden"
          />
          <img
            src={`/common/${navbarConfig.logo.src}`}
            alt={navbarConfig.logo.alt}
            className="h-12 max-w-36 min-w-12 object-left dark:hidden"
          />
        </div>
        <p className="text-lg md:text-2xl">Join us for</p>
        <h1 className="text-3xl md:text-5xl font-bold">{config.hero.title}</h1>
        <p className="text-xl md:text-3xl">{config.hero.subtitle}</p>
        <div className="mt-4 mb-4 md:mb-8 h-[1px] bg-black dark:bg-white w-[70%] md:w-[unset] mx-auto" />
        <p className="mb-2 font-bold">{config.eventInfo.date}</p>
        <p className="line-clamp-4 mb-6 md:mb-12 opacity-70 text-sm md:text-base">
          {config.hero.description}
        </p>
        {new Date(config.eventInfo.registration.start_date) < new Date() ? (
          <>
            {!(
              userProgress == Progress.completeRegistration ||
              userProgress == Progress.completeRegistrationTeamLead ||
              userProgress == Progress.notYetTeamMember
            ) && (
              <a
                href={"/register"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 md:px-11 py-3 md:py-4 text-base dark:text-black text-white rounded-full dark:bg-white bg-black font-medium"
              >
                {user?.email === "balivadask2000@gmail.com" ? "sold out" :  userProgress == Progress.noApplication
                  ? "get tickets"
                  : userProgress == Progress.paymentPending
                  ? "pay now"
                  : "complete application"}
              </a>
            )}

            {(userProgress == Progress.completeRegistration ||
              userProgress == Progress.completeRegistrationTeamLead ||
              userProgress == Progress.notYetTeamMember) && (
              <a
                href={"/"}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-6 py-2 border-2 border-[#20344B] text-[#20344B] dark:border-white dark:text-white mt-8"
              >
                you're in.
              </a>
            )}
          </>
        ) : (
          <>
            <a
              data-tooltip-id="coming-soon"
              className="px-6 md:px-11 py-3 md:py-4 text-base  rounded-full border-2 font-medium"
            >
              {"coming soon"}
            </a>{" "}
            <Tooltip
              id="coming-soon"
              content="Registration will open soon on 5th July 2026 6:00 PM IST"
            ></Tooltip>
          </>
        )}
        {/* <a
          href={config.hero.cta.link}
          className="px-11 py-4 text-base dark:text-black text-white rounded-full dark:bg-white bg-black font-medium"
        >
          {config.hero.cta.text}
        </a> */}

        {userProgress == Progress.completeRegistrationTeamLead && (
          <a
            href={"/edit-team"}
            className="ml-2 rounded-full px-6 py-2 border-2 border-[#20344B] dark:border-white text-[#20344B]  dark:text-white mt-8"
          >
            edit team
          </a>
        )}
      </div>
      <div className="md:grow md:flex md:flex-col">
        <img
          src={`/images/home/${config.hero.image}`}
          className="object-contain mt-auto"
        />
      </div>
    </div>
  );
}

function getTime() {
  const now = Date.now() / 1000;
  const endTime = new Date(config.eventInfo.event_startDate).getTime() / 1000;
  const timeLeft = Math.max(endTime - now, 0);
  const daysLeft = Math.floor(timeLeft / 86400);
  const hoursLeft = Math.floor((timeLeft - daysLeft * 86400) / 3600);
  const minutesLeft = Math.floor(
    (timeLeft - daysLeft * 86400 - hoursLeft * 3600) / 60
  );
  const secondsLeft = Math.floor(
    timeLeft - daysLeft * 86400 - hoursLeft * 3600 - minutesLeft * 60
  );

  return {
    now,
    timeLeft,
    daysLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
  };
}

// function Countdown() {
//   const [time, setTime] = useState("00:00:00:00");
//   useEffect(() => {
//     setInterval(() => {
//       const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = getTime();
//       setTime(
//         "" +
//           daysLeft.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
//           ":" +
//           hoursLeft.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
//           ":" +
//           minutesLeft.toLocaleString("en-US", { minimumIntegerDigits: 2 }) +
//           ":" +
//           secondsLeft.toLocaleString("en-US", { minimumIntegerDigits: 2 })
//       );
//     }, 1000);
//   });
//   return (
//     <div className="w-full px-8 border-2 border-black dark:border-white rounded-full flex flex-col p-4 text-center">
//       <p className="text-5xl">{time}</p>
//       <p>day:hour:min:sec</p>
//     </div>
//   );
// }

function Countdown() {
  const [time, setTime] = useState(["00", "00", "00", "00"]);

  useEffect(() => {
    setInterval(() => {
      const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = getTime();
      setTime([
        daysLeft.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        hoursLeft.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        minutesLeft.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        secondsLeft.toLocaleString("en-US", { minimumIntegerDigits: 2 }),
      ]);
    }, 1000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-8 border-2 border-black dark:border-gray-700 rounded-full flex justify-center gap-4 p-4 text-center">
      {time.map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <p className="text-5xl font-medium">{unit}</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {["day", "hour", "min", "sec"][index]}
          </p>
        </div>
      ))}
    </div>
  );
}

function HeroBentoRightFirstCard() {
  return (
    <div className="flex gap-4 aspect-[1.1] max-h-80">
      <div className="border-2 grow bg-[#19AFC3] border-gray-700 rounded-3xl p-8">
        <h3 className="text-3xl font-bold mb-4">Bag your swags</h3>
        {/* <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mi
          justo.
        </p>
        <p className="px-8 font-medium py-2 my-4 bg-white w-max rounded-full text-[#19AFC3]">
          submit
        </p> */}
        <div className="w-36 md:w-50">
          <Carousel images={swags} />
        </div>
      </div>
      <div className="border-2 dark:border-gray-700 shrink-0 w-28 bg-[#CCE6CF] rounded-3xl p-2">
        <Marquee
          direction="up"
          className="overflow-hidden"
          style={{
            width: "314px",
            height: "112px",
            translate: "-110px 94px",
            borderRadius: "24px",
          }}
        >
          {techStack.map((item, index) => {
            return (
              <div key={index} className="flex mx-3 bg-white rounded-full p-2">
                <img
                  src={item}
                  className="size-12 object-center object-contain m-auto"
                />
              </div>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}

function HeroBentoRightSecondCard() {
  return (
    <div className="border-2 bg-[#F8BB15] text-black dark:border-gray-700 w-full h-full relative rounded-3xl flex flex-col p-8 justify-center">
      <h3 className="text-xl uppercase font-bold">Prize pool</h3>
      <p className="text-6xl font-black">₹30,000</p>
      {/* <p className="bg-white rounded-full size-12 flex items-center justify-center cursor-pointer absolute top-6 right-6">
        {"->"}
      </p> */}
    </div>
  );
}

function Benefits({ benefits }: { benefits: any }) {
  return (
    <div className="w-full px-8 border-2 dark:border-gray-700 py-12 rounded-2xl">
      <h4 className="px-8 py-2 border-2 w-max rounded-full mb-3 text-sm">
        benefits
      </h4>
      <div className="ml-3">
        <h1 className="text-2xl font-bold mb-4">What's in it for me?</h1>
        <p className="text-base text-gray-700 dark:text-gray-400 mb-6 max-w-[48ch]">
          We have something for everyone this WoW, whether you are a budding
          entrepreneur or a passionate developer.
          <br />
          We got you all cover! Join us for the biggest bash of the year.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">I want to</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {benefits.map((benefit: any) => (
            <div
              key={benefit.title}
              className="h-full rounded-xl overflow-hidden shadow group cursor-pointer"
            >
              <div className="relative h-48">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute top-[-1px] right-[-1px] p-3 bg-white dark:bg-[#0a0a0a] rounded-bl-2xl">
                  <div
                    className="text-white text-center px-6 py-2 rounded-lg text-[12px]"
                    style={{ backgroundColor: benefit.color, width: "140px" }}
                  >
                    <p>{benefit.title}</p>
                  </div>
                </div>
                <div>
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 rounded-bl-xl hidden group-hover:block"
                    style={{
                      backgroundColor: benefit.color,
                      opacity: 0.92,
                    }}
                  >
                    {benefit.benefits.map((desc: any, index: any) => (
                      <p key={index} className="text-white mb-2 text-sm">
                        • {desc}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SponsorsSection({ sponsorsData }: { sponsorsData: any }) {
  return (
    <div id="sponsors" className="mt-12 px-4 google-font">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-2">Our Sponsors</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Sponsors dedicated to building remarkable experience!
        </p>

        <div className="mt-4">
          <CommonSponsorInfo sponsorsData={sponsorsData} />
        </div>
      </div>
    </div>
  );
}
function CommonSponsorInfo({ sponsorsData }: { sponsorsData: any }) {
  return (
    <div className="w-full px-0 mx-0">
      {sponsorsData.map((item: any, index: any) => (
        <div key={index} className="mb-8 mt-0 google-font">
          <div className="mb-4 text-lg font-bold">{item.category_name}</div>
          <div className="flex flex-wrap gap-4">
            {item.sponsors.map((sponsor: any, indexp: any) => (
              <div
                key={indexp}
                className="w-1/2 sm:w-1/3 md:w-1/6 text-center p-2 bg-gray-100 dark:bg-gray-900 border border-black dark:border-white rounded-xl"
              >
                <a
                  aria-label="sponsor name"
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tooltip-id={`tooltip-${index}-${indexp}`}
                >
                  <img
                    src={`/images/sponsors/${sponsor.logo}`}
                    alt="sponsor-logo"
                    className="mx-auto max-h-20 object-contain dark:hidden"
                  />
                  <img
                    src={`/images/sponsors/${
                      sponsor["dark-logo"] || sponsor.logo
                    }`}
                    alt="sponsor-logo"
                    className="mx-auto max-h-20 object-contain hidden dark:block dark:brightness-200"
                  />
                </a>
                <Tooltip
                  id={`tooltip-${index}-${indexp}`}
                  content={sponsor.name}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const user = useAuthContext();
  const [userProgress, setUserProgress] = useState(Progress.noApplication);
  useEffect(() => {
    if (user === null) {
      return;
    }
    GetUserProgress(user.uid).then((response) => {
      console.log(response);
      if (typeof response == "string") {
        alert(response);
        return;
      }
      setUserProgress(response);
    });
  }, [user]);
  return (
    <div>
      <TaskList userProgress={userProgress} />
      <main className="space-y-4 -translate-y-5">
        <div className="flex flex-col lg:flex-row md:gap-4">
          <HeroBentoLeft userProgress={userProgress} />
          <div className="py-2 bg-[#000000] w-full text-white overflow-hidden md:hidden">
            <Marquee>
              <p className="mx-4">WOW 2026 Andhra Pradesh •</p>
              <p className="mx-4">WOW 2026 Andhra Pradesh •</p>
              <p className="mx-4">WOW 2026 Andhra Pradesh •</p>
              <p className="mx-4">WOW 2026 Andhra Pradesh •</p>
            </Marquee>
          </div>
          <div className="mt-4 md:mt-[unset] md:w-full flex flex-col gap-4 mx-4 md:mx-[auto]">
            <Countdown />
            <HeroBentoRightFirstCard />
            <HeroBentoRightSecondCard />
          </div>
        </div>
        <div className="flex gap-4 flex-col md:flex-row mx-4 md:mx-[unset]">
          <div className="md:w-[48%] lg:w-[25%] rounded-3xl p-8 bg-[#619244] border-2 dark:border-gray-700 shrink-0">
            <h4 className="px-8 py-2 border-2 dark:border-white text-white w-max rounded-full">
              mission
            </h4>
            <p className="md:text-4xl lg:text-5xl font-bold mt-8 text-white">
              {config.hero.theme}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 shrink-0 text-white">
            {config.eventInfo.stats.map((stat, index) => {
              return (
                <div
                  style={{ backgroundColor: stat.color }}
                  key={index}
                  className={`border-2 border-black p-6 w-full h-full rounded-3xl content-center`}
                >
                  <p className="text-6xl md:text-5xl lg:text-6xl">
                    {stat.value}
                  </p>
                  <p>{stat.name}</p>
                </div>
              );
            })}
          </div>
          <div className="border-2 dark:border-gray-700 block md:hidden lg:block grow rounded-3xl overflow-x-hidden relative">
            <Carousel images={galleryImages} />
          </div>
        </div>
        <div className="border-2 dark:border-gray-700 hidden md:block lg:hidden grow rounded-3xl overflow-x-hidden relative">
          <Carousel images={galleryImages} />
        </div>
        <Benefits benefits={config.eventInfo.benefits} />
        <div className="relative z-5 flex w-full flex-col md:flex-row border-2 rounded-3xl overflow-hidden">
          <div className="md:absolute top-4 left-4 p-8">
            <h3 className="max-w-[16ch] text-2xl font-medium">
              Here&apos;s what our WOWicians from last year had to say
            </h3>
            <p className="text-sm max-w-[32ch] mt-2">
              We are grateful to all the participants who made WoW 2024 a
              success. Here are some of the testimonials from our participants.
            </p>
          </div>
          <div className="md:absolute top-12 right-0 md:w-[75%] z-10">
            <div className="relative mt-6 lg:mt-12 group/swiper">
              <Swiper
                autoplay={{
                  pauseOnMouseEnter: true,
                }}
                allowTouchMove={true}
                spaceBetween={16}
                initialSlide={0}
                modules={[Autoplay, Navigation, FreeMode]}
                freeMode={true}
                centeredSlidesBounds={true}
                centeredSlides={true}
                loop={true}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  0: {
                    spaceBetween: 20,
                    slidesPerView: 1,
                  },
                  768: {
                    spaceBetween: 20,
                    slidesPerView: 3,
                  },
                  1024: {
                    centeredSlidesBounds: false,
                    centeredSlides: false,
                    slidesPerView: 3,
                    spaceBetween: 32,
                  },
                }}
              >
                {testimonials
                  .map((t) => {
                    return {
                      name: t.provider.name,
                      designation: `${t.provider.position}, ${t.provider.company}`,
                      role: t.provider.role,
                      pronoun: t.provider.gender,
                      image: t.provider.image,
                      content: t.description,
                    };
                  })
                  .map((testimonial, index) => {
                    return (
                      <SwiperSlide key={index} className="!w-max">
                        <div className="shadow-lg shadow-stone-200/70 dark:shadow-stone-600/70 w-max p-6 rounded-xl border border-gray-200/75 bg-white dark:bg-gray-900">
                          <div className="flex gap-4 items-center">
                            <img
                              src={testimonial.image}
                              className="h-[72px] border-2 mr-3 rounded-full"
                            />
                            <div>
                              <p className="md:text-xl font-semibold google-font">
                                {testimonial.name}{" "}
                                <span className="text-sm mx-2 bg-[var(--android-primary-color)] p-2 text-white rounded-xl">
                                  {testimonial.pronoun}
                                </span>
                              </p>

                              <p className="text-sm opacity-70 google-font">
                                {testimonial.designation}
                              </p>
                              <p className="text-sm font-bold google-font opacity-70">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm max-w-[24ch] md:max-w-[36ch] mt-4 line-clamp-4 google-font">
                            {testimonial.content}
                          </p>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              <div className="absolute items-center justify-between z-[5] flex h-full top-0 w-full px-11 pointer-events-none">
                <div className="swiper-button-prev bg-white border-black border-[2px] cursor-pointer !w-[3.5rem] !h-[3.5rem] rounded-full items-center justify-center flex !text-black font-bold !font-[2.2rem] group-hover/swiper:scale-100 scale-0 transition duration-300 -translate-x-[150%] group-hover/swiper:translate-x-0 group-hover/swiper:!pointer-events-auto"></div>
                <div className="swiper-button-next  bg-white border-black border-[2px] cursor-pointer !w-[3.5rem] !h-[3.5rem] rounded-full items-center justify-center flex !text-black font-bold group-hover/swiper:scale-100 scale-0 transition duration-300 translate-x-[150%] group-hover/swiper:translate-x-0 group-hover/swiper:!pointer-events-auto"></div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <img
              src="/common/trees-bottom.png"
              className="mt-auto max-h-[200px] -scale-x-100"
            />
            <img
              src="/common/camp-viewpoint.png"
              className="mt-4 md:mt-[200px] mr-auto max-h-[400px] md:-scale-x-100"
            />
            <img
              src="/common/mountains-bottom.png"
              className="hidden md:block mt-auto ml-auto max-h-[300px] "
            />
          </div>
        </div>
        <SponsorsSection sponsorsData={sponsors} />
      </main>
    </div>
  );
}
