import { ReactNode } from "react";


interface Props {
  className:ReactNode
}

export default function Footer({ className }:Props) {
  return (
    <div
      className={`${className} justify-between text-sm w-full`}
    >
      <span>
        created by{" "}
        <a
          className="underline"
          href="https://devchallenges.io/portfolio/Hussein-Mourad"
        >
          Hussein-Mourad
        </a>
      </span>
      <a href="https://devchallenges.io">devchallenges.io</a>
    </div>
  );
}
