import { forwardRef } from "react";

const Input = forwardRef(function Input({ name, label, ...props }, ref) {
  return (
    <div className="control">
      <label htmlFor={name}>{label}</label>
      <input name={name} {...props} ref={ref} />
    </div>
  );
});

export default Input;
