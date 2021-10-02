import { CircularProgress } from "@material-ui/core";
import { ReactElement } from "react";

interface Props {}

export default function LoadingScreen({}: Props): ReactElement {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-screen min-h-screen p-4">
      <CircularProgress classes={{ circle: "text-primary" }} />
    </div>
  );
}
