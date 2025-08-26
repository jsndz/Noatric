import check from "../../../assets/check.svg";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import Logo from "/noatric-logo.png";
const Collaboration = () => {
  return (
    <Section crosses id="stack">
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">Kinetic Collection Hub</h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <img src={check} width={24} height={24} alt="check" />
                  <h6 className="body-2 ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <Button to="/">Try it now</Button>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-28">
          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100">
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <div className="rounded-full border border-n-6 border-gray-500 p-[0.2rem]">
                    <div className="rounded-full border border-n-6 border-gray-400 p-[0.4rem]">
                      <div className="rounded-full border border-n-6 border-gray-300 p-[1rem]">
                        <img src={Logo} width={48} height={48} alt="Noatric" />
                      </div>
                    </div>
                  </div>
                  <ul>
                    {collabApps.map((app, index) => (
                      <li
                        key={app.id}
                        className={`absolute top-0 left-1/2 h-1/2 -ml-[2.4rem] origin-bottom rotate-${
                          index * 45
                        }`}
                      >
                        <div
                          className={`relative -top-[7rem] flex w-[4.8rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                            index * 45
                          }`}
                        >
                          <img
                            className="m-auto"
                            width={app.width}
                            height={app.height}
                            alt={app.title}
                            src={app.icon}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
