import Breadcrumb from "../assets/components/breadcrumb";
import RoundButton from "../assets/components/round_button";
import Chatbox from "../assets/components/chatbox";
import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import BuddyList from "../assets/components/BuddyList";
import Box from "@mui/material/Box";
import { BarLoader } from "react-spinners";

function BuddyChat() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section>
      {loading ? (
        <div className="flex items-center justify-center h-screen w-screen bg-white">
          <BarLoader
            color="#6C63FF"
            loading={loading}
            className="text-center"
          />
        </div>
      ) : (
        <div className="p-8 lg:px-20 lg:py-12">
          <p
            data-aos="fade-up"
            data-aos-once
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
            👋 Say hi to your <span className="text-primary">buddy</span>!
          </h1>
          <div data-aos="fade-up" data-aos-once data-aos-delay="300">
            <BuddyList />
            <Chatbox />
          </div>
        </div>
      )}
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
