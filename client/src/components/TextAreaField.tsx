import cn from "classnames";
import React, { ReactElement, TextareaHTMLAttributes } from "react";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function InputField({
  label,
  error,
  className = "",
  ...props
}: TextAreaProps): ReactElement {
  const inputStyles = cn(
    "w-full rounded-btn textarea",
    className
  );

  return (
    <div className="w-full form-control">
      {label && (
        <label className="label" htmlFor={label}>
          <span className="label-text">{label}</span>
        </label>
      )}
      <textarea
        id={props.id || label || props.name}
        className={inputStyles}
        {...props}
      />
      {error && (
        <small className="label">
          <span className="text-red-400 label-text-alt">{error}</span>
        </small>
      )}
    </div>
  );
}
