import { ExitToApp, ExpandLess, ExpandMore } from "@material-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactElement,useRef } from "react";
import { useToggle, useOnClickOutside } from "../hooks";

interface Props {}

export default function DropDownMenu({}: Props): ReactElement {
  const [isMenuOpen, toggleMenu] = useToggle();
  const router = useRouter();
  const ref = useRef(null);
  useOnClickOutside(ref, toggleMenu);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {}
  };

  return (
    <button onClick={toggleMenu} className="relative" ref={ref}>
      {isMenuOpen ? <ExpandLess /> : <ExpandMore />}

      {isMenuOpen && (
        <div className="absolute right-0 transform -translate-y-3 bottom-full card">
          <ul
            tabIndex={0}
            className="p-2 !pl-2 shadow menu  bg-base-100 rounded-box w-52"
          >
            <li className="w-full text-red-400">
              <a className="space-x-3" onClick={handleLogout}>
                <ExitToApp /> <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </button>
  );
}
