import cn from "classnames";
import React, { InputHTMLAttributes, ReactElement, ReactNode } from "react";

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
  const inputStyles = cn("w-full h-full px-4 rounded-btn bg-transparent", {
    "rounded-l-none pl-0": left,
    "rounded-r-none pr-0": right,
  });

  return (
    <div className="w-full form-control">
      {label && (
        <label className="label" htmlFor={label}>
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className={cn("flex px-0 input", className)}>
        {left && <div className="flex items-center bg-transparent">{left}</div>}
        <input
          id={props.id || label || props.name}
          className={inputStyles}
          {...props}
        />
        {right && <div className="flex items-center bg-transparent">{right}</div>}
      </div>
      {error && (
        <small className="label">
          <span className="text-red-400 label-text-alt">{error}</span>
        </small>
      )}
    </div>
  );
}
