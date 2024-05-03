import React from "react";
import Button from "./components/Button";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import Header from "./components/Header";
import Hero from "./components/Hero";
const LandingPage = () => {
  return (
    <div>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
      </div>
      <ButtonGradient />
    </div>
  );
};

export default LandingPage;
