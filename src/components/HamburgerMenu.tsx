import { useState } from "react";
import { Menu } from "lucide-react";
import ResponsiveMenu from "../components/ResponsiveMenu";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        className="block sm:hidden max-[640px]:block justify-end mt-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <Menu className="text-[#38384F]" />
        ) : (
          <Menu className="text-[#ffffff]" />
        )}
      </button>

      <ResponsiveMenu isOpen={isOpen} />
    </div>
  );
}
