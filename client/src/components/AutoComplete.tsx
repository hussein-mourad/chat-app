import cn from "classnames";
import useOnClickOutside from "hooks/useOnClickOutside";
import React, {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
  label?: string;
  className?: string;
  error?: string;
  options: string[];
  children?: ReactNode;
  onChange?: (e: any) => void;
}

export default function SelectGroup({
  left,
  right,
  label,
  error,
  options,
  children,
  onChange,
  className = "",
  ...props
}: Props): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLButtonElement[]>([]);
  const optionsWrapper = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  useOnClickOutside(ref, (e) => setShowOptions(false));

  const handleChange = (e: any) => {
    setShowOptions(true);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    onChange && onChange(e);
  };

  const inputStyles = cn("w-full h-full px-4 rounded-btn bg-base-200", {
    "rounded-l-none pl-0": left,
    "rounded-r-none pr-0": right,
    className,
  });

  return (
    <div className="relative w-full" ref={ref}>
      <label
        className="block mb-2 text-sm text-gray-800"
        htmlFor={props.id || label || props.name}
      >
        {label}
      </label>

      <div className="flex px-0 input focus-within:ring-2 focus-within:ring-gray-300 bg-base-200">
        {left && <div className="flex items-center">{left}</div>}
        <input
          ref={inputRef}
          className={inputStyles}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && optionsRef.current[0]) {
              optionsRef.current[0].focus();
            }
            if (e.key == "Escape") {
              setShowOptions(false);
            }
          }}
          {...props}
        />
        {right && <div className="flex items-center">{right}</div>}
      </div>
      {inputRef?.current?.value && showOptions && filteredOptions.length > 0 && (
        <div
          className="absolute left-0 z-50 w-full p-2 transform translate-y-2 top-full rounded-btn card bg-base-200"
          ref={optionsWrapper}
        >
          {filteredOptions.map((option, index) => (
            <button
              key={option}
              className="block w-full px-3 py-1 my-1 text-left border-0 rounded-md btn bg-base-200 hover:bg-base-content-2"
              onClick={() => {
                let e = {
                  target: {
                    id: inputRef.current?.id,
                    name: inputRef.current?.name,
                    value: option,
                  },
                };
                onChange && onChange(e);
                setShowOptions(false);
              }}
              onKeyDown={(e) => {
                if (e.key == "ArrowDown") {
                  optionsRef.current[
                    Math.min(filteredOptions.length - 1, index + 1)
                  ].focus();
                }
                if (e.key == "ArrowUp") {
                  optionsRef.current[Math.max(0, index - 1)].focus();
                  index == 0 && inputRef?.current?.focus();
                }
                if (e.key == "Escape") {
                  setShowOptions(false);
                }
              }}
              ref={(ref) => {
                optionsRef.current[index] = ref as HTMLButtonElement;
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <small className="block mt-1 text-red-500">{error}</small>
    </div>
  );
}
