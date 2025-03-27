import React from "react";

const FormInput = ({
  label,
  type = "text",
  name,
  id,
  placeholder,
  value,
  onChange,
  onClick,
  className = "",
  transparent = false,
  children = null,
  readOnly = false,
  autoComplete = "off",
  wrapperClassName = "",
  required = false,
  labelClassName = "",
}) => {
  const baseClasses =
    "px-4 py-2 focus:border-indigo-500 outline-none border border-slate-700 rounded-md";
  const bgClass = transparent ? "bg-transparent" : "bg-[#6a5fdf]";

  return (
    <div
      className={`flex flex-col w-full gap-1 relative mb-2 ${wrapperClassName}`}
    >
      {label && (
        <label htmlFor={id || name} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        readOnly={readOnly}
        type={type}
        name={name}
        id={id || name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        className={`${baseClasses} ${bgClass} ${className}`}
        autoComplete={autoComplete}
        required={required}
      />
      {children}
    </div>
  );
};

export default FormInput;
