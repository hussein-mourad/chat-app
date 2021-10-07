import { Send } from "@material-ui/icons";
import axios from "axios";
import { useFormik } from "formik";
import { ReactElement, useContext } from "react";
import { SocketContext } from "src/providers/SocketProvider";
import { InputField } from ".";
import { IRoom } from "../types/";

interface Props {
  room?: IRoom;
}

export interface FormValues {
  message: string;
}

const initialValues: FormValues = {
  message: "",
};

function validate(values: FormValues) {
  let errors: any = {};

  if (values.message.length >= 300) {
    errors.message = "Message is too long. (Max 300 characters)";
  }
  return errors;
}

export default function MessageForm({ room }: Props): ReactElement {
  const socket = useContext(SocketContext);

  const formik = useFormik({
    initialValues: { ...initialValues },
    validate,
    onSubmit: async (values: FormValues, actions) => {
      actions.setSubmitting(false);
      socket.connect();
      console.log("send message");
      try {
        const response = await axios.post("/api/messages/", {
          body: values.message,
          currentRoomId: room?._id,
        });
        socket.emit("message", { room: room?._id, message: response.data });
        actions.resetForm();
      } catch (error) {
        console.log(
          "🚀 ~ file: MessageForm.tsx ~ line 27 ~ sendMessage ~ error",
          error
        );
      }
    },
  });

  return (
    <form
      className="fixed bottom-0 right-0 flex items-center justify-center w-screen lg:w-[calc(100%-320px)] h-20 px-3 sm:px-10 bg-base-100"
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <InputField
        type="text"
        placeholder="Type a message here"
        className="bg-base-200"
        right={
          <div className="ml-3">
            <button
              className="m-1 btn btn-primary btn-square btn-sm"
              type="submit"
              disabled={!formik.values.message}
            >
              <Send style={{ fontSize: 15 }} />
              <span className="sr-only">send</span>
            </button>
          </div>
        }
        id="message"
        error={
          formik.touched.message && formik.errors.message
            ? formik.errors.message
            : " "
        }
        {...formik.getFieldProps("message")}
      />
    </form>
  );
}
