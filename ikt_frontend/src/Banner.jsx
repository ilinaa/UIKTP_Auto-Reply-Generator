import React from 'react';
import img1 from "../src/assets/IKTBanner.png";
import FINKILogo from "../src/assets/FINKILogo.png";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <Link to="/questionForm">
    <section
      className="w-full relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${img1})`, height: '650px' }}
    >
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-28">
        {/* Left Side: Text */}
        <div className="w-full text-white text-center md:text-left">
          <h4 className="text-3xl md:text-6xl font-bold mb-4 leading-tight md:leading-[8rem] ml-0 md:ml-20 color-green">
            Официјален 
            AI-поддржан <br />
            помошник за 
            студентите на <br />
            ФИНКИ
          </h4>

          <h2 className="text-xl md:text-2xl ml-0 md:ml-20 color-green">
            Сите твои прашања одговорени за неколку секунди!
          </h2>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-6 md:mt-0">
          <img
            src={FINKILogo}
            alt="FINKI Logo"
            className="w-48 md:w-64 lg:w-72 object-contain"
          />
        </div>
      </div>
    </section>
    </Link>
  );
}
