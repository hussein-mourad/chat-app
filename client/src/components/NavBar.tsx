/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import IUser from "types/User";
import DropDownMenu from "./DropDownMenu";

interface Props {
  user: IUser;
}

export default function NavBar({ user }: Props) {
  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link href="/" passHref>
          <img src="/devchallenges-light.svg" alt="logo" />
        </Link>
          <div className="flex items-center focus:outline-none">
            <img
              className="w-8 h-8 rounded-lg"
              src={user.avatar}
              alt="avatar"
            />
            <span className="ml-2 mr-1">{user.username}</span>
            <DropDownMenu position="down" />
          </div>
      </nav>
    </header>
  );
}
