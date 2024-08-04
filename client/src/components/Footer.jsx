import svgIcon from "../assets/Excavator.svg";

function Footer() {
  return (
    <footer>
      <div className="bg-gray-800 text-white p-6 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row justify-around">
        <div className="flex flex-col sm:flex-row items-center  sm:items-start mb-6 sm:mb-0">
          <img
            src={svgIcon}
            alt="SVG Icon"
            className="w-16 h-16 mb-4 sm:mb-0 sm:mr-4"
          />
          <div>
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap items-center  sm:items-start">
              <span className="text-white ">
                Hiring Of Construction Gear & Workforce
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 sm:mt-4">
              For your construction needs, rent the best and diverse machinery
              and workforce on our
              <br /> website. Contact us to get quality machinery and skilled
              workforce at the best prices.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center sm:items-start text-sm sm:text-base">
          <div className="mb-4">
            <div>Contact us: </div>
            Email:{" "}
            <a
              href="mailto:sherkhan9725644@gmail.com"
              className="text-blue-400"
            >
              sherkhan9725644@gmail.com
            </a>
            <br />
            
            <a
              href="mailto:aneestahir12201@gmail.com"
              className="text-blue-400"
              
            >
               aneestahir12201@gmail.com
            </a>
          </div>
          <div>
            WhatsApp:{" "}
            <a href="https://wa.me/03322773300" className="text-blue-400">
              03322773300
            </a>
          </div>
        </div>
      </div>
      <div className="bg-slate-700 p-2 text-center">
        <span className="text-sm sm:text-base">
          © 2024 Construction Machinery Hiring. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
