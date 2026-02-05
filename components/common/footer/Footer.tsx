import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-white via-gray-50 to-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div>
            <Link
              href="https://github.com/HyeontaeKim0"
              className="text-lg flex gap-2 font-extrabold tracking-tight text-gray-900 mb-10"
            >
              <div className="flex items-center justify-center">
                <FaGithub className="text-xl" />
              </div>
              <span>HyeontaeKim0</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-gray-500 text-xs text-center leading-relaxed font-medium">
            This website is not officially affiliated with Formula 1®, Formula
            One Management, Formula One World Championship™ or any other related
            companies. F1®, FORMULA 1®, FORMULA ONE®, FORMULA ONE WORLD
            CHAMPIONSHIP™ and related logos are registered trademarks of Formula
            One Licensing B.V.
          </p>
          <p className="text-gray-500 text-xs text-center mt-4 font-medium">
            All race data and statistics on this site are provided with
            reference to official Formula 1® materials. While we strive for
            accuracy, please refer to F1.com for official records.
          </p>
        </div>
      </div>
    </footer>
  );
}
