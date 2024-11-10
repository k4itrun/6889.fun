import { ButtonProps } from "@/interfaces";

type ButtonState = "loading" | "disabled" | "success" | "error" | "default";

export default function Button({
    children,
    className = "",
    disabled = false,
    state = "default",
    ...props
  }: ButtonProps & { state?: ButtonState }) {
  
  const baseClasses = "px-4 py-2 rounded-lg min-h-[44px] relative overflow-hidden transition-all duration-200";
  
  const stateClasses = {
    default: "bg-primary text-white hover:shadow-2xl",
    loading: "bg-gray-500 text-gray-200 cursor-wait",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    disabled: "bg-gray-300 text-gray-400 cursor-not-allowed",
  };

  const classNames = `${baseClasses} ${stateClasses[state]} ${className}`;
  return (
    <button
      className={classNames}
      disabled={state === "disabled" || state === "loading"}
      {...props}
    >
      {state === "loading" ? (
        <span className="loader"></span> 
      ) : (
        <span
          className={`absolute inset-0 bg-white opacity-0 transition-all duration-200 group-hover:opacity-10 group-active:opacity-20`}
        />
      )}
      {children}
    </button>
  );
};
