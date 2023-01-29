import Breadcrumb from "../assets/components/breadcrumb";
import RoundButton from "../assets/components/round_button";
import Chatbox from "../assets/components/chatbox";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import BuddyList from "../assets/components/BuddyList";
import Box from "@mui/material/Box";

function BuddyChat() {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  return (
    <section>
      {/* header */}
      <div className="p-8 lg:px-20 lg:py-12">
        <p
          data-aos="fade-up"
          data-aos-onceå
          data-aos-delay="100"
          className="text-gray-500 text-lg lg:text-xl"
        >
          Step 2:
        </p>
        <h1
          data-aos="fade-up"
          data-aos-once
          data-aos-delay="250"
          className="text-2xl py-2 lg:text-3xl text-gray-700 font-semibold"
        >
          👋 Say <span className="text-primary">Hi</span> to your new Friend!
        </h1>
      </div>
      <Box>
        <BuddyList></BuddyList>
        <Chatbox />
      </Box>
      

      {/* breadcrumbs */}
      <div>
        <Breadcrumb home="/" configure="/Questions" chat="" />
      </div>

      {/* go back button */}
      <div>
        <RoundButton page="/Questions" />
      </div>
    </section>
  );
}
export default BuddyChat;
