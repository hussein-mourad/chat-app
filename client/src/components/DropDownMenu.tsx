import {
  AccountCircle,
  ExitToApp,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import axios from "axios";
import cn from "classnames";
import { useRouter } from "next/router";
import React, { ReactElement, useRef } from "react";
import { useOnClickOutside, useToggle } from "../hooks";

interface Props {
  position?: "up" | "down";
  className?: string;
}

export default function DropDownMenu({
  position = "up",
  className,
}: Props): ReactElement {
  const [isMenuOpen, toggleMenu, setIsMenuOpen] = useToggle();
  const router = useRouter();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsMenuOpen(false));

  const handleLogout = async () => {
    try {
      const response = await axios.post(process.env.BACKEND_URL+"/api/auth/logout");
      router.push("/login");
    } catch (error) {}
  };

  const styles = cn(
    "absolute card right-0 transform shadow-lg",
    {
      "-translate-y-3 bottom-full": position === "up",
    },
    { "translate-y-3 top-full": position === "down" },
    className
  );

  return (
    <button onClick={toggleMenu} className="relative rounded-btn" ref={ref}>
      {isMenuOpen ? <ExpandLess /> : <ExpandMore />}

      {isMenuOpen && (
        <div className={styles}>
          <ul
            tabIndex={0}
            className="p-2 !pl-2 menu bg-base-100/70 rounded-box w-52 space-y-2"
          >
            <li className="w-full">
              <a className="space-x-3" onClick={() => router.push("/profile")}>
                <AccountCircle /> <span>Profile</span>
              </a>
            </li>
            <hr className="border-base-200" />
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
