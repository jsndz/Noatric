import { companyLogos } from "../constants";

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-700">
        Discover the wonders of kinetic creations with our featured categories:
      </h5>

      <ul className="flex">
        {companyLogos.map((category, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <img src={category.img} width={50} height={5} alt={category.name} />
            <p className="text-xs mt-2 font-semibold"> {category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
