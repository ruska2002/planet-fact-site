import { useParams } from "react-router-dom";
import data from "../../data.json";
import { useState } from "react";

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
}

const viewToImageKey = {
  overview: "planet",
  structure: "internal",
  geology: "geology",
} as const;

export default function Planet() {
  const [currentText, setCurrentText] = useState<
    "overview" | "structure" | "geology"
  >("overview");
  const { planetName } = useParams<{ planetName: string }>();
  const planet = data.find((planet) => planet.name === planetName) as
    | Planet
    | undefined;

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

  const domain = getDomain(planet?.[currentText]?.source);

  const getImageSizeClasses = () => {
    if (!planet) return "";

    const view = viewToImageKey[currentText];
    const size = planet.sizes[view];

    if (!size) return "";
    return `
      w-[${size.mobileWidth}] h-[${size.mobileHeight}]
      md:w-[${size.tabletWidth}] md:h-[${size.tabletHeight}]
      lg:w-[${size.laptopWidth}] lg:h-[${size.laptopHeight}]
    `;
  };

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
      <div className="relative text-center">
        <img
          src={planet?.images[viewToImageKey[currentText]]}
          alt={planet?.name}
          className={`lg:absolute mx-auto lg:mx-0 ${getImageSizeClasses()} object-contain mt-[64px] lg:ml-[360px] lg:mt-[120px]`}
        />
      </div>
      <div className="ml-[21px] mr-[21px] text-center md:text-left md:ml-8 md:flex md:flex-row md:gap-10 lg:flex-col lg:ml-[1006px]">
        <div className="flex-1">
          <p className="text-[#ffffff] font-normal text-[35px] uppercase mt-[50px] lg:text-[70px]">
            {planet?.name}
          </p>
          <p className="text-[#ffffff] text-[11px] font-medium text-center opacity-80 md:text-left md:w-[339px] lg:text-left lg:text-[14px]">
            {planet?.[currentText].content}
          </p>

          <p className="text-[#ffffff] text-[12px] font-normal md:mt-3 lg:mt-5">
            Source:{" "}
            <a
              href={planet?.[currentText].source}
              target="_blank"
              rel="noreferrer"
              className="underline font-bold"
            >
              {domain}
            </a>
          </p>
        </div>

        <div className="hidden md:flex md:flex-col md:justify-start md:gap-2 md:mt-[68px] md:mr-[120px] lg:mt-[-10px]">
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
      </div>

      <div className="md:text-[22px] md:flex md:justify-between text-[#ffff] uppercase text-center ml-[30px] mr-[30px] mt-8 mb-4 md:gap-4 lg:gap-[40px] lg:ml-[180px] lg:mr-[180px] lg:mt-[50px]">
        <div className="flex md:flex-col justify-between border border-white/20 p-4 w-full">
          <p className="text-[8px] mb-4 mt-4 md:text-[10px]">ROTATION TIME</p>
          <p>{planet?.rotation}</p>
        </div>
        <div className="flex md:flex-col justify-between border border-white/20 p-4 w-full">
          <p className="text-[8px] mb-4 mt-4 md:text-[10px]">REVOLUTION TIME</p>
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
  );
}
