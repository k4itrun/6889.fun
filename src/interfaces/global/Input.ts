export interface InputProps {
    className?: string;
    startsWith?: React.ReactNode;
    wrapper?: "input" | "textarea";
    rows?: number;
    wrapperClass?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
    type: string;
    [key: string]: any; // To support other props not defined here
}