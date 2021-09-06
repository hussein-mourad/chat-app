import { Search } from "@material-ui/icons";
import type { NextPage } from "next";
import type { ReactElement } from "react";
import React from "react";
import { AutoComplete, InputField } from "../components";

const Home: NextPage = (): ReactElement => {
  return (
    <div className="min-h-screen mx-10 my-5">
      <div className="py-10">
        <InputField left={<Search style={{ margin: "10px" }} />} />
      </div>
      <div className="py-10">
        <InputField label="hi"  />
      </div>
      <div className="py-10">
        <AutoComplete options={["a", "b", "c"]} />
      </div>
    </div>
  );
};

export default Home;
