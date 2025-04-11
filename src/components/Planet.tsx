import { useParams } from "react-router-dom";
import data from "../../data.json";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const buttonName = [
  { name: "overview", text: "OVERVIEW", mobileText: "OVERVIEW" },
  { name: "structure", text: "Internal Structure", mobileText: "STRUCTURE" },
  { name: "geology", text: "Surface Geology", mobileText: "SURFACE" },
] as const;

interface Size {
  mobileWidth: string;
  mobileHeight: string;
  tabletWidth: string;
  tabletHeight: string;
  laptopWidth: string;
  laptopHeight: string;
}

interface Planet {
  name: string;
  overview: { content: string; source: string };
  structure: { content: string; source: string };
  geology: { content: string; source: string };
  images: { planet: string; internal: string; geology: string };
  color: string;
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  sizes: {
    planet: Size;
    internal: Size;
    geology: Size;
  };
  miniPic: string;
}

const viewToImageKey = {
  overview: "planet",
  structure: "internal",
  geology: "geology",
} as const;

export default function Planet() {
  const matchesTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const matchesLaptop = useMediaQuery({ minWidth: 1024 });

  const [currentText, setCurrentText] = useState<
    "overview" | "structure" | "geology"
  >("overview");

  const { planetName } = useParams<{ planetName: string }>();
  const planet = data.find((planet) => planet.name === planetName) as
    | Planet
    | undefined;

  const PlanetImage = planet;

  const getDomain = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      let hostName = parsedUrl.hostname;

      //hostname aris properti romelic abrunebs aqedan https://en.wikipedia.org/wiki/Mercury_(planet) amas en.wikipedia.org

      // ვშლი www , en, ან მსგვას ტექსტს დასაწყისიდან
      hostName = hostName.replace(/^(www\.|en\.)/, "");
      // აქ ვშლი ბოლოდან .ორგ-ს
      hostName = hostName.replace(/\.org$/, "");

      return hostName;
    } catch (error) {
      console.error("Invalid URL", error);
      return "Invalid URL";
    }
  };

  const getCurrentSize = () => {
    // ამ ფუნქციით ვიგებ რომელ ფოტოზე დგას, რომ იმისი ზომები გამოვიყენო ჯეისონიდან

    if (!planet) return { width: "0px", height: "0px" };

    const view = viewToImageKey[currentText]; //რომელი ფოტოაა
    const size = planet.sizes[view]; // მომაქვს ზომა

    if (!size) return { width: "0px", height: "0px" };

    if (matchesTablet) {
      return { width: size.tabletWidth, height: size.tabletHeight };
    } else if (matchesLaptop) {
      return { width: size.laptopWidth, height: size.laptopHeight };
    } else {
      return { width: size.mobileWidth, height: size.mobileHeight };
    }
  };

  const miniPic = (): { miniWidth: string; miniHeight: string } => {
    if (!planet) return { miniWidth: "0px", miniHeight: "0px" };
    if (matchesLaptop) {
      return { miniWidth: "180px", miniHeight: "180px" };
    } else if (matchesTablet) {
      return { miniWidth: "100px", miniHeight: "100px" };
    } else {
      return { miniWidth: "60px", miniHeight: "60px" };
    }
  };

  const { width, height } = getCurrentSize();
  const { miniWidth, miniHeight } = miniPic();

  const domain = getDomain(planet?.[currentText]?.source);

  return (
    <div>
      <nav className="flex md:hidden lg:hidden ">
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
        <div className="lg:flex lg:justify-center lg:flex-row lg:items-center lg:min-h-[60vh]  px-4  md:flex md:flex-col md:justify-center ">
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
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none lg:mt-36  lg:ml-12 mt-10 ml-8"
                style={{ width: miniWidth, height: miniHeight }}
              />
            )}
          </div>

          <div className="lg:w-1/2 px-6 lg:px-12 lg:flex lg:flex-col md:flex md:justify-center md:items-center">
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
                  {domain}
                </a>
              </p>
            </div>

            {(matchesTablet || matchesLaptop) && (
              <div className="mt-6 md:flex md:flex-col md:gap-2 md:mt-14">
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

        <div className="flex flex-col gap-3 md:text-[22px] md:flex md:flex-row md:justify-between text-[#ffff] uppercase text-center ml-[30px] mr-[30px] mt-8 mb-4 md:gap-4 lg:gap-[40px] lg:ml-[180px] lg:mr-[180px]">
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
