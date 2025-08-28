import { forwardRef } from "react";

const TextInput = forwardRef(({ label, name, type, placeholder, astric, error, ...rest }, ref) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium">
        {label} {astric && <span className="text-red-500">*</span>}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="border p-2 rounded focus:outline-none"
        {...rest}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
});

export default TextInput;
