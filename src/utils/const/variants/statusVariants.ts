import { cva } from "class-variance-authority";

export const statusVariants = cva("transition-all", {
    variants: {
        variant: {
            pending: "bg-amber-50 border-amber-200 text-amber-700",
            in_progress: "bg-blue-50 border-blue-200 text-blue-700",
            completed: "bg-green-50 border-green-200 text-green-700",
            cancelled: "bg-red-50 border-red-200 text-red-700",
            all: "bg-indigo-50 border-indigo-200 text-indigo-700",
        },
    },
    defaultVariants: {
        variant: "all",
    }
})