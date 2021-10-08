/* eslint-disable @next/next/no-img-element */
import { CameraAlt as CameraAltIcon } from "@material-ui/icons";
import axios from "axios";
import { useFormik } from "formik";
import useToggle from "hooks/useToggle";
import { useState } from "react";
import IUser from "types/User";
import ChangePhotoModal from "./ChangePhotoModal";
import InputField from "./InputField";

interface Props {
  user: IUser;
  setUser: (user: IUser) => void;
}

export default function ProfileEdit({ user, setUser }: Props) {
  const [message, setMessage] = useState("");
  const [isModalOpen, toggleModal] = useToggle();

  const formik = useFormik({
    initialValues: { username: user.username },
    validate: (values) => {
      return values.username ? {} : { username: "Required" };
    },
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.put("/api/user/", values);
        setMessage(response.data);
        setUser({ ...user, username: values.username });
        setTimeout(() => setMessage(""), 3000);
      } catch (error: any) {
        actions.setErrors({ username: error.response.data.message });
      }
    },
  });

  const handleResetPicture = async () => {
    try {
      const response = await axios.put("/api/user/?removePicture=true");
      setUser({ ...user, avatar: response.data.avatar });
    } catch (error) {}
  };

  return (
    <div className="w-full p-2 border-gray-300 rounded-lg sm:border sm:mt-2 sm:px-10 sm:py-5 md:py-8">
      {isModalOpen && (
        <ChangePhotoModal
          user={user}
          setUser={setUser}
          stateHandler={toggleModal}
        />
      )}
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
      <form className="mt-2" onSubmit={formik.handleSubmit}>
        <div>
          <InputField
            label="Name"
            type="text"
            className="input-bordered bg-base-200"
            id="username"
            placeholder="Enter your username..."
            value={formik.values.username}
            onChange={formik.handleChange("username")}
            error={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ""
            }
          />

          <small className="block text-sm text-green-500 text-semibold">
            {message}
          </small>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="!h-10 !min-h-0 px-5 btn btn-primary "
            type="submit"
          >
            Save
          </button>
          <button
            className="!h-10 !min-h-0 text-red-400 bg-transparent border border-red-400 btn-error btn focus:bg-red-400/80 hover:bg-red-400/80 hover:text-base-content focus:text-base-content "
            type="button"
            onClick={handleResetPicture}
          >
            Remove Picture
          </button>
        </div>
      </form>
    </div>
  );
}
