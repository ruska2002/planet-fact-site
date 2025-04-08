import { useParams } from "react-router-dom";
import data from "../../data.json";
import { useState } from "react";

const buttonName = [
  { name: "overview", text: "OVERVIEW", mobileText: "OVERVIEW" },
  { name: "structure", text: "Internal Structure", mobileText: "STRUCTURE" },
  { name: "geology", text: "Surface Geology", mobileText: "SURFACE" },
] as const;

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
    mobileWidth: string;
    mobileHeight: string;
    tabletWidth: string;
    tabletHeight: string;
    laptopWidth: string;
    laptopHeight: string;
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

  const getImageSize = (view: "planet" | "internal" | "geology") => {
    const sizes = planet?.sizes[view];
    if (!sizes) return { width: "173px", height: "173px" };

    const windowWidth = window.innerWidth;

    if (windowWidth <= 640) {
      // Mobile size
      return { width: sizes.mobileWidth, height: sizes.mobileHeight };
    } else if (windowWidth <= 1024) {
      // Tablet size
      return { width: sizes.tabletWidth, height: sizes.tabletHeight };
    } else {
      // Laptop size
      return { width: sizes.laptopWidth, height: sizes.laptopHeight };
    }
  };
  const { width, height } = getImageSize(viewToImageKey[currentText]);

  return (
    <div>
      <nav className="flex">
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

      <hr className=" opacity-20" />
      <div className="text-center">
        <img
          src={planet?.images[viewToImageKey[currentText]]}
          alt={planet?.name}
          style={{ width, height }}
          className="mt-[64px] mx-auto sm:mx-0"
        />
      </div>
      <div className="ml-[21px] mr-[21px] text-center">
        <p className="text-[#ffffff] font-normal text-[35px] uppercase mt-[50px]">
          {planet?.name}
        </p>
        <p className="text-[#ffffff] text-[11px] font-medium text-center opacity-80">
          {planet?.[currentText].content}
        </p>
        <p className="text-[#ffffff] text-[12px] font-normal ">
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
      <div className="text-[#ffff] uppercase text-center ml-[30px] mr-[30px] mt-8 mb-4">
        <div className="flex justify-between mb-2 border border-white/20 items-baseline">
          <p className="ml-[15px] text-[8px] mb-4 mt-4">ROTATION TIME</p>
          <p className="mr-[15px]">{planet?.rotation}</p>
        </div>
        <div className="flex justify-between mb-2 border border-white/20 items-baseline">
          <p className="ml-[15px] text-[8px] mb-4 mt-4">REVOLUTION TIME</p>
          <p className="mr-[15px]">{planet?.revolution}</p>
        </div>
        <div className="flex justify-between mb-2 border border-white/20 items-baseline">
          <p className="ml-[15px] text-[8px] mb-4 mt-4">radius </p>
          <p className="mr-[15px] text-end">{planet?.radius}</p>
        </div>
        <div className="flex justify-between mb-2 border border-white/20 items-baseline">
          <p className="ml-[15px] text-[8px] mb-4 mt-4">AVERAGE TEMP.</p>
          <p className="mr-[15px]">{planet?.temperature}</p>
        </div>
      </div>
    </div>
  );
}
