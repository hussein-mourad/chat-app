import cn from "classnames";
import React, {
  ForwardedRef,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
  label?: string;
  error?: string;
  className?: string;
}

export default function InputField({
  left,
  right,
  label,
  error,
  className = "",
  ...props
}: InputProps): ReactElement {
  const inputStyles = cn("w-full h-full px-4 rounded-btn bg-base-200", {
    "rounded-l-none pl-0": left,
    "rounded-r-none pr-0": right,
    className,
  });

  return (
    <div className="form-control">
      {label && (
        <label className="label" htmlFor={label}>
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className="flex px-0 input focus-within:ring-2 focus-within:ring-gray-300 bg-base-200">
        {left && <div className="flex items-center">{left}</div>}
        <input
          id={props.id || label || props.name}
          className={inputStyles}
          {...props}
        />
        {right && <div className="flex items-center">{right}</div>}
      </div>
      {error && (
        <small className="label">
          <span className="text-red-400 label-text-alt">{error}</span>
        </small>
      )}
    </div>
  );
}
{
  /* <div className="h-full p-2"> */
}
{
  /* <button className="h-full min-h-0 btn btn-primary">Go</button> */
}
{
  /* </div>  */
}
{
  /* <div className="flex w-full h-full mt-5 rounded-lg bg-base-200">
      {left && <div className="flex items-center">{left}</div>}
      <input
        type="text"
        name=""
        id=""
        className={inputStyles}
        placeholder="Search..."
      />
      {right && <div className="flex items-center">{right}</div>}
    </div> */
}
