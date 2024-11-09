import React from "react";
import { Link } from "react-router-dom";

const CurvedNav = () => {
  const navItems = [
    { label: "ZAPP", path: "/" },
    { label: "PRODUCTS", path: "/#product" },
    { label: "ABOUT", path: "/about" },
    { label: "FAQ", path: "/#faq" },
    { label: "LAZY SOUL?", path: "/lazysoul" },
    { label: "SHOP NOW", path: "/#your-fav" },
  ];

  return (
    <nav className="fixed hidden md:block top-1/2 -right-5 z-50">
      <div className="-translate-y-1/2 text-white flex gap-2 items-center">
        <ul className="flex flex-col space-y-8 mr-11">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`text-right flex justify-end items-center text-[11px] gap-2 ${
                index === 0 || index === navItems.length - 1 ? "mr-3" : ""
              }`}
            >
              <a
                href={item.path}
                className="hover:text-[#C10000] transition-colors"
              >
                {item.label}
              </a>
              {/* Conditionally render hr for all items except the first and last */}
              {index !== 0 && index !== navItems.length - 1 && (
                <hr className="w-4" />
              )}
            </li>
          ))}
        </ul>

        <svg
          width="40"
          height="250"
          viewBox="0 0 20 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-4 absolute right-3"
        >
          <path
            d="M1 399C11 399 19 391 19 381V19C19 9 11 1 1 1"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>
    </nav>
  );
};

export default CurvedNav;
