import type { statusVariants } from "@/utils/const/variants/statusVariants";
import type { VariantProps } from "class-variance-authority";

export interface StatusCardProps extends VariantProps<typeof statusVariants>  {
    title: string;
    count: number;
    percentChange?: number;
}