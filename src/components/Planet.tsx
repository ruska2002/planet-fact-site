import { useParams } from "react-router-dom";
import data from "../../data.json";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const buttonName = [
  { name: "overview", text: "OVERVIEW", mobileText: "OVERVIEW" },
  { name: "structure", text: "Internal Structure", mobileText: "STRUCTURE" },
  { name: "geology", text: "Surface Geology", mobileText: "SURFACE" },
] as const;

const viewToImageKey = {
  overview: "planet",
  structure: "internal",
  geology: "geology",
} as const;

export default function Planet() {
  const matchesTablet = useMediaQuery(
    "(min-width: 768px) and (max-width: 1023px)"
  );
  const matchesLaptop = useMediaQuery("(min-width: 1024px)");

  const [currentText, setCurrentText] = useState<
    "overview" | "structure" | "geology"
  >("overview");

  const { planetName } = useParams<{ planetName: string }>();
  const planet = data.find((planet) => planet.name === planetName) as
    | Planet
    | undefined;

  const getCurrentSize = () => {
    // ამ ფუნქციით ვიგებ რომელ ფოტოზე დგას, რომ იმისი ზომები გამოვიყენო ჯეისონიდან

    if (!planet) return { width: "0px", height: "0px" };

    const view = viewToImageKey[currentText]; //რომელი ფოტოაა
    const size = planet.sizes[view]; // მომაქვს ზომა

    if (!size) return { width: "0px", height: "0px" };

    return {
      width: matchesTablet
        ? size.tabletWidth
        : matchesLaptop
        ? size.laptopWidth
        : size.mobileWidth,
      height: matchesTablet
        ? size.tabletHeight
        : matchesLaptop
        ? size.laptopHeight
        : size.mobileHeight,
    };
  };

  const miniPic = (): { miniWidth: string; miniHeight: string } => {
    if (!planet) return { miniWidth: "0px", miniHeight: "0px" };
    if (matchesLaptop) {
      return { miniWidth: "180px", miniHeight: "180px" };
    } else if (matchesTablet) {
      return { miniWidth: "120px", miniHeight: "120px" };
    } else {
      return { miniWidth: "80px", miniHeight: "80px" };
    }
  };

  const { width, height } = getCurrentSize();
  const { miniWidth, miniHeight } = miniPic();

  return (
    <div>
      <nav className="flex md:hidden lg:hidden justify-center items-center ">
        {buttonName.map((view, index) => (
          <button
            className="text-[#ffffff] uppercase"
            key={index}
            onClick={() => setCurrentText(view.name)}
          >
            <span className="block md:hidden space-between text-[10px] mt-4 mb-3 font-bold ml-6 mr-12">
              {view.mobileText}
            </span>
            <span className="hidden md:block">{view.text}</span>
            {currentText === view.name && (
              <div
                className="w-[75px] h-[4px] ml-4"
                style={{ backgroundColor: planet?.color }}
              ></div>
            )}
          </button>
        ))}
      </nav>
      <hr className="opacity-20" />

      <div className="lg:max-w-[1440px] mx-auto">
        <div className="lg:flex lg:justify-center lg:flex-row lg:items-center lg:min-h-[60vh] px-4 md:flex md:flex-col md:justify-center ">
          <div className="flex justify-center items-center lg:w-1/2 relative mt-5">
            <img
              src={planet?.images[viewToImageKey[currentText]]}
              alt={planet?.name}
              className="mx-auto object-contain"
              style={{ width, height }}
            />
            {currentText === "geology" && (
              <img
                src={planet?.miniPic}
                className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 object-contain pointer-events-none"
                style={{ width: miniWidth, height: miniHeight }}
              />
            )}
          </div>

          <div className="lg:w-1/2 px-6 lg:px-12 lg:flex lg:flex-col md:flex md:justify-center md:items-center lg:gap-6 md:gap-16">
            <div>
              <p className="text-[#ffffff] font-normal text-[35px] uppercase mt-[50px] lg:text-[70px] text-center">
                {planet?.name}
              </p>
              <p className="text-[#ffffff] text-[11px] font-medium text-center opacity-80 md:text-left md:w-[339px]">
                {planet?.[currentText].content}
              </p>
              <p className="text-[#ffffff] text-[12px] font-normal md:mt-3 text-center">
                Source:{" "}
                <a
                  href={planet?.[currentText].source}
                  className="underline font-bold"
                >
                  Wikipedia
                </a>
              </p>
            </div>

            {(matchesTablet || matchesLaptop) && (
              <div className="mt-6 md:flex md:flex-col md:gap-2 md:mt-14 lg:mt-0">
                {buttonName.map((view, index) => (
                  <div
                    key={index}
                    className={`md:w-[281px] md:h-[40px] flex items-center px-4 lg:w-[350px] lg:h-[48px] ${
                      currentText === view.name ? "" : "border border-white/20"
                    }`}
                    style={
                      currentText === view.name
                        ? { backgroundColor: planet?.color }
                        : undefined
                    }
                  >
                    <button
                      className="text-white uppercase text-left w-full"
                      onClick={() => setCurrentText(view.name)}
                    >
                      {view.text}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:text-[22px] md:flex md:flex-row md:justify-between text-[#ffff] text-center uppercase ml-[30px] mr-[30px] mt-8 mb-4 md:gap-4 lg:gap-[40px] lg:text-center">
          <div className="flex md:flex-col justify-between border border-white/20 p-4 w-full">
            <p className="text-[8px] mb-4 mt-4 md:text-[10px]">ROTATION TIME</p>
            <p>{planet?.rotation}</p>
          </div>
          <div className="flex md:flex-col justify-between border border-white/20 p-4 w-full">
            <p className="text-[8px] mb-4 mt-4 md:text-[10px]">
              REVOLUTION TIME
            </p>
            <p>{planet?.revolution}</p>
          </div>
          <div className="flex md:flex-col justify-between border border-white/20  p-4 w-full">
            <p className="text-[8px] mb-4 mt-4 md:text-[10px]">radius </p>
            <p>{planet?.radius}</p>
          </div>
          <div className="flex md:flex-col justify-between border border-white/20 p-4 w-full">
            <p className="text-[8px] mb-4 mt-4 md:text-[10px]">AVERAGE TEMP.</p>
            <p>{planet?.temperature}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
