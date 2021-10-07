/* eslint-disable @next/next/no-img-element */
import { CameraAlt as CameraAltIcon } from "@material-ui/icons";
import axios from "axios";
import { useFormik } from "formik";
import useToggle from "hooks/useToggle";
import { useState } from "react";
import IUser from "types/User";
import InputField from "./InputField";


interface Props {
  user: IUser;
}

export default function ProfileEdit({ user: userProp }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const [isModalOpen, toggleModal] = useToggle();
  const [user, setUser] = useState(userProp);

  const formik = useFormik({
    initialValues:{username:user.username},
    onSubmit:async (values,actions)=>{
      try {
        axios.post("",values)
      } catch (error) {
        
      }

    }
  })

  setTimeout(() => setMessage(""), 3000);

  return (
    <div
      className="w-full p-2 border-gray-300 rounded-lg sm:border sm:mt-2 sm:px-10 sm:py-5 md:py-8"
    >
      {/* {isModalOpen && (
        <ChangePhotoModal
          user={user}
          setUser={setUser}
          id={user._id}
          stateHandler={toggleModal}
        />
      )} */}
      <h1 className="text-xl">Change info</h1>
      <p className="mt-2 text-sm">
        Changes will be reflected to every services
      </p>
      <div className="flex items-center">
        <div className="relative flex justify-center w-32 h-32 mt-5 mr-5 group">
          <button
            className="absolute inset-0 items-center justify-center hidden w-full bg-black rounded-md group-hover:flex bg-opacity-30 active:text-gray-200"
            onClick={toggleModal}
          >
            <CameraAltIcon />
          </button>

          <img className="rounded-md" src={user.avatar} alt="profile picture" />
        </div>
        <button
          className="text-sm uppercase btn btn-link btn-sm "
          onClick={toggleModal}
        >
          change photo
        </button>
      </div>
      <form className="mt-2 space-y-2" onSubmit={formik.handleSubmit}>
        <InputField
          label="Name"
          type="text"
          className="input-bordered bg-base-200"
          id="username"
          placeholder="Enter your username..."
          value={user.username}
          onChange={formik.handleChange("username")}
          error={formik.touched.username&& formik.errors.username? formik.errors.username:""}
        />

        <small className="block text-sm text-green-500 text-semibold">
          {message}
        </small>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
