"use client";
import React from 'react';
import { Session } from '../../../services/stubs';

interface SessionCardProps {
  session: Session;
  isBookmarked?: boolean;
  onBookmarkClick?: (id: string) => void;
  trackEvent?: (name: string, data: any) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, isBookmarked, onBookmarkClick, trackEvent }) => {
  const bookmarked = isBookmarked || session.bookmarked;
  return (
    <div
      role="listitem"
      className="session w-full md:max-w-[484px]"
      data-session-id={session.id}
      data-topic={JSON.stringify(session.topics)}
      data-level={JSON.stringify(session.level)}
      data-type={JSON.stringify(session.type)}
      data-stack={JSON.stringify(session.stack)}
      style={{ display: "block" }}
    >
      <div className="w-full">
        <a
          href={`/explore/${session.id}/`}
          onClick={(event) => {
            if (trackEvent) {
              trackEvent("session_select", {
                sessionName: session.title,
                sessionCode: session.sessionCode,
                sessionId: session.id,
              });
            }
          }}
          className="focus:outline-none card-link"
        >
          <div className="w-full aspect-w-16 aspect-h-9 relative mb-5">
            <img
              loading="lazy"
              role="img"
              aria-hidden="true"
              className="absolute h-full w-full object-cover"
              src={session.thumbnail}
            />
          </div>
          <div className="mb-4 md:min-h-[136px] body-outlined">
            {session.time && (
              <p className="sm:l-eyebrow uppercase">{session.time}</p>
            )}
            <div className="font-medium! sm:s-p1 md:l-h6 mt-2">
              {session.title}
            </div>
            <p className="mt-2 sm:s-p2">
              {session.description}
            </p>
          </div>
        </a>
        <div className="flex mt-auto justify-between">
          <div className="card__keywords">
            <p className="sr-only">Session tags</p>
            {session.tags.map((tag, i) => (
              <span key={i} className="">
                <div className="">
                  <div className={tag.includes('Android') || tag.includes('Cloud') || tag.includes('Firebase') || tag.includes('Play') || tag.includes('Web') ? "h-translated-category" : ""} data-name={tag} data-speaker="False">
                    <span>{tag}</span>
                  </div>
                </div>
              </span>
            ))}
          </div>
          <div className="flex flex-1 justify-end gap-2 items-center">
            {session.time && (
              <div
                className="h-calendar"
                data-id={session.id}
                data-code={session.sessionCode}
                data-title={session.title}
                data-description={session.description}
                data-start-time="0001-01-01T00:00:00"
                data-end-time="0001-01-01T00:00:00"
                data-add-label=""
                data-force-white-color=""
              >
                <button aria-label="Add to calendar" className="flex">
                  <span className="flex justify-center items-center w-6 h-6">
                    <svg
                      aria-hidden="true"
                      role="presentation"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.5 3H18V2.25C18 2.05109 17.921 1.86032 17.7803 1.71967C17.6397 1.57902 17.4489 1.5 17.25 1.5C17.0511 1.5 16.8603 1.57902 16.7197 1.71967C16.579 1.86032 16.5 2.05109 16.5 2.25V3H7.5V2.25C7.5 2.05109 7.42098 1.86032 7.28033 1.71967C7.13968 1.57902 6.94891 1.5 6.75 1.5C6.55109 1.5 6.36032 1.57902 6.21967 1.71967C6.07902 1.86032 6 2.05109 6 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 4.5V6H4.5V4.5H19.5ZM4.5 19.5V7.5H19.5V19.5H4.5Z"
                        className="dark:fill-white forced-white-color fill-grey"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            )}
            <div
              className="r-bookmark"
              data-bm-session-id={session.id}
              data-session-path=""
              data-session-code={session.sessionCode}
              data-disable-dark-mode="False"
              data-white-spinner=""
              data-myio-label=""
              data-label-position=""
              data-title={session.title}
              data-category=""
              data-force-white-color=""
              data-label-style={{ sm: "s-cta1 md:l-cta2" }}
            >
              <button
                type="button"
                className="flex items-center"
                aria-label="Bookmark this session"
                onClick={() => onBookmarkClick && onBookmarkClick(session.id)}
              >
                <span className="flex justify-center items-center w-6 h-6">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill={bookmarked ? "currentColor" : "none"}
                    xmlns="http://www.w3.org/2000/svg"
                    className={bookmarked ? "text-google-blue" : "forced-white-color"}
                  >
                    <path
                      d="M1 1v18l6.079-4.5 7.184 4.5V1H1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      className="hcm-link-text-stroke black dark:stroke-grey-bg"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
