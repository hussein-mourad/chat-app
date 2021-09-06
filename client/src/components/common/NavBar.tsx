import MenuIcon from "@material-ui/icons/Menu";
import { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function NavBar({ children }: Props): ReactElement {
  return (
    <nav
      className="shadow-navbar navbar min-h-[55px] sm:min-h-16 fixed top-0 right-0 bg-base-100 h-[55px] sm:h-16 w-screen md:w-[calc(100%-320px)]"
      style={{}}
    >
      <button className="p-3 mr-3 rounded-full active:bg-base-300/20">
        <MenuIcon />
      </button>
      <div>{children}</div>
    </nav>
  );
}
