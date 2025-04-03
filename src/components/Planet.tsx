import { useParams } from "react-router-dom";
import data from "../../data.json";
import { useState } from "react";

// Define the type for the planet data structure
interface Planet {
  name: string;
  overview: {
    content: string;
    source: string;
  };
  structure: {
    content: string;
    source: string;
  };
  geology: {
    content: string;
    source: string;
  };
  images: {
    planet: string;
    internal: string;
    geology: string;
  };
  color: string;
  image: string;
}

const imageNavigation = ["OVERVIEW", "STRUCTURE", "SURFACE"] as const;

export default function Planet() {
  const { planetName } = useParams<{ planetName: string }>(); // Type for useParams
  const planet = data.find((planet) => planet.name === planetName) as
    | Planet
    | undefined;

  // State types and initialization
  const [currentView, setCurrentView] = useState<
    "OVERVIEW" | "STRUCTURE" | "SURFACE"
  >("OVERVIEW");
  const [currentText, setCurrentText] = useState<
    "overview" | "structure" | "geology"
  >("overview");

  if (!planet) {
    return <p>Planet not found</p>;
  }

  return (
    <div>
      {/* Planet Image */}
      <img
        src={planet.images[currentText]}
        alt={`${planet.name} ${currentView}`}
      />

      {/* Planet Name */}
      <h2 className="text-[#ffffff]">{planet.name}</h2>

      {/* Description */}
      <p className="text-[#ffffff]">{planet[currentText].content}</p>

      {/* View Buttons */}
      <nav>
        {imageNavigation.map((view, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentView(view);
              setCurrentText(
                view.toLowerCase() as "overview" | "structure" | "geology"
              ); // Dynamically change content type
            }}
            className={currentView === view ? "active" : ""}
          >
            {view}
          </button>
        ))}
      </nav>
    </div>
  );
}
