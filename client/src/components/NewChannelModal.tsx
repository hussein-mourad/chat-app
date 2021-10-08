import axios from "axios";
import { useFormik } from "formik";
import React, { ReactElement, useContext, useRef } from "react";
import { SocketContext } from "src/providers/SocketProvider";
import { useOnClickOutside } from "../hooks";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";

interface Props {
  className: string;
  closeHandler: () => void;
}

export interface FormValues {
  name: string;
  description: string;
}

const initialValues: FormValues = {
  name: "",
  description: "",
};

function validate(values: FormValues) {
  let errors: any = {};

  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  } else {
    if (values.name.length >= 50) {
      errors.description = "Name is too long. (Max 50 characters)";
    }
    if (values.description.length >= 300) {
      errors.description = "Description is too long. (Max 300 characters)";
    }
  }
  return errors;
}

export default function NewChannelModal({
  closeHandler,
  className,
}: Props): ReactElement {
  const ref = useRef(null);
  useOnClickOutside(ref, closeHandler);
  const socket = useContext(SocketContext);

  const formik = useFormik({
    initialValues: { ...initialValues },
    validate,
    onSubmit: async (values: FormValues, actions) => {
      actions.setSubmitting(false);
      try {
        const response = await axios.post(process.env.BACKEND_URL+"/api/rooms", values);
        socket.emit("room added", response.data);
        closeHandler();
      } catch (err: any) {
        actions.setErrors({
          name: "Unexpected error please try again.",
        });
      }
    },
  });
  return (
    <div className={`shadow-md card bg-base-300  ${className}`} ref={ref}>
      <form className="pb-3 card-body" onSubmit={formik.handleSubmit} autoComplete="off">
        <h2 className="mb-3 text-lg card-title text-bold md:mb-5">
          New Channel
        </h2>
        <div className="space-y-3 md:space-y-5">
          <InputField
            type="text"
            placeholder="Channel name"
            id="name"
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : " "
            }
            {...formik.getFieldProps("name")}
          />
          <TextAreaField
            placeholder="Channel Description"
            className="resize-none"
            rows={5}
            id="description"
            error={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : " "
            }
            {...formik.getFieldProps("description")}
          />
        </div>
        <div className="justify-end mt-1 card-actions">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
          <button className="btn btn-ghost" onClick={closeHandler}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
