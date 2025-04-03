import { Link } from "react-router-dom";

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
  return (
    <>
      <header>
        <h1 className="text-[#ffffff] text-[28px] mt-[-4px] tracking-tighter font-normal">
          THE PLANETS
        </h1>
        <nav>
          <ul className="hidden sm:flex space-x-4">
            {navigation.map((planet) => (
              <li className="text-red-500" key={planet}>
                <Link to={`/${planet}`}>{planet}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
