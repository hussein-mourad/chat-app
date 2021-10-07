/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ReactNode } from "react";
import IUser from "types/User";

interface ItemProps {
  title: string;
  children: ReactNode;
}

const ProfileItem = ({ title, children }: ItemProps) => {
  return (
    <div className="flex items-center justify-between px-2 py-8 sm:justify-start sm:px-10 ">
      <span className="w-5/12 mr-5 text-sm font-medium uppercase sm:w-2/12">
        {title}
      </span>
      <div className="inline-block w-5/6 break-words">{children}</div>
    </div>
  );
};

interface Props {
  user: IUser;
}

export default function Profile({ user }: Props) {
  var fields = ["avatar", "username"];
  return (
    <div className="w-full mt-2 border-gray-300 divide-y rounded-lg sm:border sm:mt-7">
      <div className="flex items-center justify-between w-full px-2 py-8 sm:px-10">
        <div className="flex flex-col text-lg font-medium ">
          Profile{" "}
          <span className="text-sm font-base ">
            Some info may be visible to other people
          </span>
        </div>

        <Link href="/profile/edit" passHref>
          <button className="px-5 py-2 btn btn-outline ">Edit</button>
        </Link>
      </div>

      {fields.map((field, index) => (
        <ProfileItem key={index} title={field}>
          {field === "avatar" && (
            <img
              className="w-20 h-20 rounded-lg"
              src={user[field]}
              alt="profile image"
            />
          )}
          {field === "username" && user[field]}
        </ProfileItem>
      ))}
    </div>
  );
}
