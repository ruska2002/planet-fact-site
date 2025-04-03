import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import data from "../../data.json";
import arrow from "../../public/clickButton.png";

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

interface ResponsiveMenuProps {
  isOpen: boolean;
}

interface Planet {
  name: string;
  image: string;
}

export default function ResponsiveMenu({ isOpen }: ResponsiveMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-20 left-0 w-full h-[667px] bg-[#070724]"
        >
          <div className="text-xl font-semibold uppercase text-white py-10">
            <ul className="flex flex-col">
              {navigation.map((planet) => {
                const planetData = data.find((p: Planet) => p.name === planet);
                return (
                  <li key={planet} className="flex items-center gap-4">
                    {/* Show image if found in data.json */}
                    {planetData?.image && (
                      <img
                        src={planetData.image}
                        alt={planet}
                        className="w-5 h-5"
                      />
                    )}
                    <Link
                      to={`/${planet}`}
                      className="text-white text-sm font-bold"
                    >
                      {planet}
                    </Link>
                    <img src={arrow} />
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
