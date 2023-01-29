import { Button, Grid } from "@mui/material";
import "../App.css";
import main from "../landing.svg";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function Landing() {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  return (
    <section data-aos="fade-up" data-aos-once data-aos-delay="500">
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="mb-12 space-y-3">
          <h1 className="text-5xl font-bold text-gray-600 text-center">
            Build-a-<span className="text-primary">Buddy</span>
          </h1>
          <p className="text-lg text-center text-gray-600 italic font-semibold">
            Configure your dream <span className="text-primary">friend</span> in
            just a few steps.
          </p>
        </div>
        <img src={main} width={300} alt="SVG" />
        <a
          href="/Questions"
          className="py-3 px-12 bg-primary text-white font-semibold rounded-2xl mt-16 hover:shadow-lg hover:bg-[#4e48be]"
        >
          Build now
        </a>
      </div>
    </section>
  );
}
export default Landing;
x;
