import { Link, useParams } from "react-router-dom";
import data from "../../data.json";

const navigation = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

export default function Header() {
  const { planetName } = useParams<{ planetName: string }>();
  const planetData = data.find((planet) => planet.name === planetName);

  return (
    <div className="w-full px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <h1 className="text-center lg:text-left text-[#ffffff] text-[28px] tracking-tighter font-normal">
        THE PLANETS
      </h1>

      <nav>
        <ul className="hidden md:flex gap-6 lg:gap-10">
          {navigation.map((planet) => {
            const isActive = planetName === planet;
            return (
              <li key={planet} className="flex flex-col items-center">
                <div
                  className={`h-[4px] w-full mb-2 lg:mt-[-46px] ${
                    isActive ? "" : "invisible"
                  }`}
                  style={{
                    backgroundColor: planetData?.color || "#ffffff",
                  }}
                />
                <Link
                  to={`/${planet}`}
                  className="text-[#ffffff] uppercase text-sm tracking-widest lg:mt-7"
                >
                  {planet}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
