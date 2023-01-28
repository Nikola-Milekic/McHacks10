import { Button, Grid } from "@mui/material";
import "../App.css";
import main from "../landing.svg";
import { Navigate,useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/Questions')
    }
  return (
    <section>
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="mb-12 space-y-3">
          <h1 className="text-5xl font-bold text-gray-600">
            Build-a-<span className="text-[#6C63FF]">Buddy</span>
          </h1>
          <p className="text-lg text-center text-gray-600 italic font-semibold">
            Configure your dream <span className="text-[#6C63FF]">friend</span>.
          </p>
        </div>
        <img src={main} width={300} alt="SVG" />
        <button onClick ={()=>handleClick()}className="py-3 px-12 bg-[#6C63FF] text-white font-semibold rounded-2xl mt-16 hover:shadow-lg hover:bg-[#4e48be]">
          Build now
        </button>
      </div>
    </section>
  );
}
export default Landing;
