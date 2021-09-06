import MenuIcon from "@material-ui/icons/Menu";
import { ReactElement, ReactNode } from "react";

interface Props {
  title: string;
}

export default function Header({ title }: Props): ReactElement {
  return (
    <header className="shadow-navbar navbar min-h-[55px] sm:min-h-16 fixed top-0 right-0 bg-base-100 h-[55px] sm:h-16 w-screen lg:w-[calc(100%-320px)]">
      <label
        htmlFor="my-drawer-2"
        className="p-3 mr-3 rounded-full active:bg-base-300/20 lg:hidden"
      >
        <MenuIcon />
      </label>
      <h1 className="text-lg font-bold lg:pl-6">{title}</h1>
    </header>
  );
}
