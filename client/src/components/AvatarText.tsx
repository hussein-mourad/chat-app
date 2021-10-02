import React, { ReactElement, ReactNode } from "react";

interface Props {
  className?: string;
  avatar: ReactNode;
  text: string;
}

export default function AvatarText({
  className = "",
  avatar,
  text,
}: Props): ReactElement {
  return (
    <div className={"flex items-center" + " " + className}>
      <div className="avatar">
        <div className="!flex items-center justify-center w-11 h-11 mr-3 text-lg font-semibold rounded-btn bg-base-200">
          {avatar}
        </div>
      </div>
      <p className="block text-lg font-bold">{text}</p>
    </div>
  );
}
