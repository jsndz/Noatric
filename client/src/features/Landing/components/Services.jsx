import Section from "./Section";
import Heading from "./Heading";
import { service2, service3 } from "../../../assets";
import { Gradient } from "./design/Services";

const Services = () => {
  return (
    <Section id="service">
      <div className="container pt-10">
        <Heading
          title="Explore the Kinetic Art."
          text="Discover the endless possibilities with Noatric's innovative Kinetic Wonders."
        />

        <div className="relative">
          <div className="relative z-1 grid gap-5 lg:grid-cols-2">
            <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={service2}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="robot"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">Kinetic Sculptures</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  Experience the fusion of art and technology with Noatric's
                  Kinetic Sculptures. Try it now!
                </p>
              </div>
            </div>

            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">Interactive Installations</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  Immerse yourself in Noatric's Interactive Installations, where
                  cutting-edge technology meets imaginative design.
                </p>
              </div>

              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                <img
                  src={service3}
                  className="w-full h-full object-cover"
                  width={520}
                  height={400}
                  alt="Scary robot"
                />
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
