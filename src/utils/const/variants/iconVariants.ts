import { cva } from "class-variance-authority";

export const iconVariants = cva("w-5 h-5", {
    variants: {
        variant: {
            pending: "text-amber-500",
            in_progress: "text-blue-500",
            completed: "text-green-500",
            cancelled: "text-red-500",
            all: "text-indigo-500",
        },
    },
    defaultVariants: {
        variant: "all",
    },
})