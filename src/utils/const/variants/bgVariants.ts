import { cva } from "class-variance-authority";

export const bgVariants = cva("w-10 h-10 rounded-full flex items-center justify-center", {
    variants: {
        variant: {
            pending: "bg-amber-100",
            in_progress: "bg-blue-100",
            completed: "bg-green-100",
            cancelled: "bg-red-100",
            all: "bg-indigo-100",
        },
    },
    defaultVariants: {
        variant: "all",
    },
})