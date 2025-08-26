import React from "react";
import ButtonSvg from "../../../assets/svg/ButtonSvg";
import { Link } from "react-router-dom";
const Button = ({ className, to, px, white, onClick, children }) => {
  const classes = `button relative inline-flex items-center  justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = `relative z-10`;
  const RenderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}> {children} </span>
      {ButtonSvg(white)}
    </button>
  );
  const RenderLink = () => (
    <Link to={to} className={classes} onClick={onClick}>
      <span className={spanClasses}> {children} </span>
      {ButtonSvg(white)}
    </Link>
  );
  return to ? RenderLink() : RenderButton();
};

export default Button;
