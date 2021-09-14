/* eslint-disable @next/next/no-img-element */
import { Search } from "@material-ui/icons";
import type { NextPage } from "next";
import type { ReactElement } from "react";
import { AutoComplete, InputField, Message, MessagesWrapper } from "../components";

const Home: NextPage = (): ReactElement => {
  return (
    <div className="min-h-screen mx-10 my-5">
      <div className="py-10">
        <InputField left={<Search style={{ margin: "10px" }} />} />
      </div>
      <div className="py-10">
        <InputField label="hi" />
      </div>
      <div className="py-10">
        <AutoComplete
          options={["a", "b", "c"]}
          left={<Search style={{ margin: "10px" }} />}
        />
      </div>

      <MessagesWrapper/>

      <Message image="https://picsum.photos/200" sender="hussein" date={new Date().toString()} message={"hi kdfjgdklg dkgjklgj dgjfklgjf fgjkfklgj ffkgjfkgjfk fgdfklgj fgjfklgj fgklfj gf fgkfj gkf fgjkfjg fkg fg "}/>

      <div className="flex">
        <div className="avatar">
          <div className="w-12 h-12 rounded-box">
            <img src="https://picsum.photos/200" alt="" />
          </div>
        </div>
      </div>

      <div className="card card-side">
        <div>
          <figure className="avatar !w-14 !h-14 rounded-box flex items-center p-10">
            <img src="https://picsum.photos/200" alt="" />
          </figure>
        </div>
        <div className="max-w-md card-body">
          <h2 className="text-base card-title">Glass</h2>
          <p className="text-sm">
            Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit
            sit necessitatibus veritatis sed molestiae voluptates incidunt iure
            sapiente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
