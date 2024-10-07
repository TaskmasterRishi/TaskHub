import React from "react";
import clsx from "clsx"; // Assuming you are using clsx

const Button = ({ className, label, type, icon, onClick = () => {} }) => {
  return (
    <button
      type={type || "button"}
      className={clsx(
        "px-3 py-2 outline-none rounded-2xl hover:-translate-y-1 hover:shadow-[0_10px_10px_0px_rgba(0,0,0,0.3)] transition-all duration-100 ease-in",
        className
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
