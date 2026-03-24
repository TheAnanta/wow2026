/* eslint-disable react/no-unescaped-entities */
"use client";
import "./styles.css";
import { useEffect } from "react";
import mainData from "@/data/config.json";

export default function Page() {
  useEffect(() => {
    document.title = `FAQ - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `FAQ - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `FAQ - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  useEffect(() => {
    if (window.location.hash === "#terms-conditions") {
      const element = document.getElementById("terms-conditions");
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);
  return (
    <div className="p-[20px] md:p-[60px] faq">
      <div className="flex flex-col md:flex-row">
        <h2>General</h2>
        <div className="mt-6 md:mt-[unset]">
          <h3>Session Schedule</h3>
          <p>
            The schedule can be found <a href="/agenda">here</a> soon.
          </p>
          <br />
          <h3>Community Guidelines</h3>
          <p>
            {" "}
            Our community guidelines can be found{" "}
            <a href="/coc" target="_blank">
              here
            </a>
            . Be nice to each other, and be respectful and constructive.
          </p>
          <br />
          <h3>Date and location</h3>
          <p>
            World of Wonders (WoW) 2026 Visakhapatnam will take place on the
            4-5th July 2026 at GITAM (Deemed to be University), Visakhapatnam.
          </p>{" "}
          <br />
          <h3>The official WOW26 app</h3>
          <p>
            The official WoW 2026 Visakhapatnam app will be your go-to resource
            to unlocking the best experience at the event. It will be your
            companion for the event, providing you with all the event-related
            information. You can access the schedule, speaker details, and more
            through the app. Be sure to download it once it's available very
            soon!
          </p>{" "}
          <br />
          <h3>Stay Informed</h3>
          <p>
            To stay up to date on the latest information on sessions, speakers,
            and activities, be sure to visit the WoW 2026 Visakapatnam website,
            and follow us on{" "}
            <a href="https://instagram.com/gdgocwowap">Instagram Page</a>. You
            can also follow and join the social conversation about WoW 2026
            Visakhapatnam via official hashtags <b>#wowxap26</b>. In addition,
            we'll be emailing important information to all registered attendees,
            along with check-in instructions prior to the conference. Make sure
            to add gdscwowvizag@gmail.com to your contacts to not let a mail
            pass your inbox.
          </p>
          <br />
          <h3>Content Formats</h3>
          <p>
            During the conference, attendees will be able to attend sessions and
            hands-on workshops, chat with experts and attendees.
          </p>
          <br />
          <h3>Language</h3>
          <p>All presentations at WoW 2026 Visakhapatnam will be in English.</p>
          <br />
        </div>
      </div>
      <br />
      <br />
      <div className="flex flex-col md:flex-row">
        <h2>Hackathon</h2>
        <div className="mt-6 md:mt-[unset]">
          <h3>Overview</h3>
          <p>
            The WoW 2026 Visakhapatnam Hackathon is a 24-hour event where
            participants will work in teams to build innovative solutions using
            the latest technologies.
            <br />
            <br />
            The hackathon will take place on the 4th-5th July 2026, starting
            at 06:00 PM on the 28th and ending at 01:00 PM on the 29th.
          </p>{" "}
          <h3>Eligibility</h3>
          <p>
            The hackathon is open to all registered attendees of WoW 2026
            Visakhapatnam. Participants can register as individuals or in teams
            of up to 5 members. Teams can be formed on the spot during the
            event.
          </p>
          <h3>Domains</h3>
          <p>
            The hackathon will focus on the following domains:
            <ul className="list-disc ml-12">
              <li>Web Development</li>
              <li>Mobile App Development</li>
              <li>AI/ML Solutions</li>
              <li>Cloud Computing</li>
              <li>No-Code Development</li>
            </ul>
            Teams can choose any of these domains, or any other relevant domain,
            to work on their projects.
            <br />
            <br />
            Participants are encouraged to think outside the box and come up
            with innovative solutions that can make a difference in the world
            and impact the community around us in meaningful ways.
          </p>
          <h3>Prizes</h3>
          <p>
            The top three teams will be awarded exciting prizes, including cash
            prizes, tech gadgets, and exclusive swag. All participants will
            receive a certificate of participation.
          </p>
          <h3>Judging</h3>
          <p>
            The hackathon projects will be judged by a panel of experts based on
            the following criteria:
            <ul className="list-disc ml-12">
              <li>Innovation and Creativity</li>
              <li>Technical Implementation</li>
              <li>User Experience</li>
              <li>Impact and Scalability</li>
            </ul>
          </p>
          <h3>AI Usage</h3>
          <p>
            Participants are encouraged to use AI tools and technologies in
            their projects. However, the use of AI should be ethical and
            transparent, with proper attribution to any AI models or datasets
            used.
          </p>
          <h3>Late night stay</h3>
          <p>
            Participants are expected to stay overnight at the venue during the
            hackathon. However, in case of any emergency, participants can leave
            the venue and return the next day by 08:00 AM sharp. However, they
            must inform the organizers about their absence and provide a valid
            reason. Also, atleast two members of the team must be present at the
            venue at all times.
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="flex flex-col md:flex-row">
        <h2>Amenities</h2>
        <div className="mt-6 md:mt-[unset]">
          <h3>Internet Access</h3>
          <p>
            Attendees can connect to the WiFi network{" "}
            <span className="text-[#D84315]">GITAM_5GHz</span> with password{" "}
            <b>Gitam$$123</b>
          </p>{" "}
          <h3>Accommodation</h3>
          <p>
            Accommodation details will be shared with registered attendees
            closer to the event date. Accommodation will be provided for the{" "}
            <span className="text-blue-500 google-font font-bold">
              night of 4th July 2026
            </span>{" "}
            at GITAM (Deemed to be University), Visakhapatnam. The cost of
            accommodation is ₹200, which will be{" "}
            <span className="text-blue-500 google-font font-bold">
              included
            </span>{" "}
            in the event registration fee. The checkout time for accommodation
            is{" "}
            <span className="text-amber-500 google-font font-bold">
              7:00 PM on 5th July 2026
            </span>
            .
            <br /> Accommodation will be provided in the{" "}
            <span className="google-font font-bold">GITAM hostel</span>, and it
            will be shared accommodation. Attendees are expected to maintain
            decorum and follow the hostel rules during their stay.
            <br /> Accommodation can be extended for an additional fee of ₹100
            per night, subject to availability.{" "}
            <span className="text-blue-500 google-font font-bold">
              If you wish to extend your stay
            </span>
            , you can manage your stay through the official WoW 2026
            Visakhapatnam app, which will be available for download closer to
            the event date.
          </p>{" "}
          <h3>Washroom</h3>
          <p>
            Washrooms can be found on either side (East and West) of the ICT
            building, located behind the elevator lobbies.
          </p>
          <h3>Drinking Fountain</h3>
          <p>
            Drinking fountain/bottle filling stations can be found next to all
            washroom entrances.
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="flex flex-col md:flex-row">
        <h2>Registration</h2>
        <section id="terms-conditions" className="mt-6 md:mt-[unset]">
          <h3>Registration terms & conditions</h3>
          <ul className="list-disc ml-12">
            <li>
              Each individual may purchase only one ticket. You may not register
              on behalf of anyone else.
            </li>
            <li>
              By registering and accepting any discounts, gifts, or items of
              value related to WoW 2026 Visakhapatnam, you certify that you are
              able to do so in compliance with applicable laws and the internal
              rules of your organization.
            </li>
            <li>
              Tickets may not be sold, bartered, or auctioned in any way, and
              doing so may result in GDGoC Andhra Pradesh rendering the ticket
              null and void without any responsibility to GDGoC Andhra Pradesh.
            </li>
            <li>
              Attendees aren't permitted to bring guests to WoW 2026
              Visakhapatnam.
            </li>
            <li>
              If you have someone traveling with you, they'll need to register
              themselves and purchase an attendee ticket.
            </li>
            <li>
              Photographs and/or video taken at WoW 2026 Visakhapatnam by GDGoC
              Andhra Pradesh, or others on behalf of GDGoC Andhra Pradesh, may
              include your image or likeness.
            </li>
            <li>
              You agree that GDGoC Andhra Pradesh may use such photographs
              and/or video for any purpose without compensation to you.
            </li>
            <li>
              All information entered into the registration form must be correct
              and accurate to the best of your knowledge.
            </li>
            <li>
              All registered attendees agree to allow GDGoC Andhra Pradesh to
              contact them regarding their registration and attendance at the
              event.
            </li>
            <li>
              By registering for a ticket, you agree to allow GDGoC Andhra
              Pradesh to communicate with you via email with information
              regarding the event.
            </li>
            <li>
              You agree to be solely responsible for your own safety,
              belongings, and well-being while participating in WoW 2026
              Visakhapatnam.
            </li>
            <li>
              GDGoC Andhra Pradesh won't be liable for your participation in WoW
              2026 Visakhapatnam.
            </li>
            <li>
              No solicitation or selling of items or services is allowed at WoW
              2026 Visakhapatnam.
            </li>
            <li>
              Any attendee conducting these activities may be removed from the
              conference.
            </li>
          </ul>
        </section>
      </div>
      <br />
      <br />
      <div className="flex flex-col md:flex-row">
        <h2>Attendee Details</h2>
        <div className="mt-6 md:mt-[unset]">
          <h3>Event Attire</h3>
          <p>
            WoW 2026 Visakhapatnam is a developer event, so please be
            comfortable and casual. There is no enforced dress code.
          </p>
          <h3>Onsite food & beverages</h3>
          <p>
            Attendees are offered complimentary breakfast, lunch, dinner and tea
            break.
          </p>
          <h3>Smoking</h3>
          <p>Smoking is strictly prohibited in the venue.</p>
          <h3>No Soliciting</h3>
          <p>
            No solicitation or selling of items or services is allowed at WoW
            2026 Visakhapatnam. Any attendee conducting these activities may be
            removed from the conference.
          </p>
          <h3>Community Guidelines</h3>
          <p>
            Check out the full Community Guidelines <a href="/coc">here</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
