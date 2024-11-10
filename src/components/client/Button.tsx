import { ButtonProps } from "@/interfaces";

export default function Button({ children, className = "", disabled, ...props }: ButtonProps) {
    return (
        <button
            className={`min-h-[44px] relative overflow-hidden px-4 py-2 rounded-lg hover:shadow-2xl transition-all duration-200 bg-primary group text-white ${className}`}
            disabled={disabled}
            {...props}
        >
            {!disabled && (
                <span className="opacity-0 group-hover:opacity-10 group-active:opacity-20 bg-white absolute left-0 top-0 w-full h-full transition-all duration-200" />
            )}
            {children}
        </button>
    );
}