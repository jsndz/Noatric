import React from "react";
import Section from "../Landing/components/Section";
import { socials } from "../Landing/constants";

import JSN from "/JSN.png";
const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <div>
          <img src={JSN} alt="JSN" width={190} height={40} />
        </div>
        <div>
          {" "}
          <p>Made By Jaison Dsouza</p>
          <p className="caption text-n-4 lg:block">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
        <div>
          {" "}
          <ul className="flex gap-5 flex-wrap">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
              >
                <img
                  src={item.iconUrl}
                  width={16}
                  height={16}
                  alt={item.title}
                />
              </a>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
