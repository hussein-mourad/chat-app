import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { InputField } from ".";
import LoadingScreen from "./LoadingScreen";

interface Props {
  authType: "Login" | "Signup";
  url: string;
}

export interface FormValues {
  username: string;
  password: string;
}

const initialValues: FormValues = {
  username: "",
  password: "",
};

function validate(values: FormValues) {
  let errors: any = {};

  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  } else {
    if (values.password.toLowerCase() === values.password) {
      errors.password = "At least one uppercase character is required";
    }
    if (!/[a-z]/.test(values.password)) {
      errors.password = "At least one lowercase character is required";
    }
    if (!/\d/.test(values.password)) {
      errors.password = "At least one digit is required";
    }
  }
  return errors;
}

export default function AuthCard({ authType, url }: Props): ReactElement {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await axios.post("/api/auth");
        router.push("/");
      } catch (err) {
        setIsLoading(false);
      }
    })();

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: { ...initialValues },
    validate,
    onSubmit: async (values, actions) => {
      actions.setSubmitting(false);
      try {
        const response = await axios.post(url, values);
        router.push("/");
      } catch (err: any) {
        if (err?.response?.data.errors) {
          const data = err.response.data;
          actions.setErrors({
            username: data.errors.username,
            password: data.errors.password || data.errors.message,
          });
        } else {
          actions.setErrors({
            password: "Unexpected error please try again.",
          });
        }
      }
    },
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <form
      className="card bordered bg-base-200 shadow-md w-full xs:w-auto xs:min-w-[400px] h-full px-2 py-3 sm:px-5"
      onSubmit={formik.handleSubmit}
    >
      <div className="card-body">
        <h1 className="text-3xl font-medium text-center card-title">
          {authType}
        </h1>
        <InputField
          type="text"
          className="input-bordered bg-base-200"
          id="username"
          label="Username"
          placeholder="Enter your username"
          error={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : " "
          }
          {...formik.getFieldProps("username")}
        />
        <InputField
          className="input-bordered bg-base-200"
          type="password"
          id="password"
          label="Password"
          placeholder="Enter your password"
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : " "
          }
          {...formik.getFieldProps("password")}
        />
        {authType === "Login" ? (
          <small className="block mb-3">
            Don&apos;t have an account?{" "}
            <Link href="/signup" passHref>
              <a className="text-blue-500" tabIndex={0}>
                Register
              </a>
            </Link>
          </small>
        ) : (
          <small className="block mb-3">
            Already have an account?{" "}
            <Link href="/login" passHref>
              <a className="text-blue-500" tabIndex={0}>
                Login
              </a>
            </Link>
          </small>
        )}
        <div className="card-actions">
          <button
            className="btn-block btn btn-primary"
            type="submit"
          >
            {authType}
          </button>
        </div>
      </div>
    </form>
  );
}
