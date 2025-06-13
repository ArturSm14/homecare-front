export type ConfirmModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string;
    onSuccess?: () => Promise<void>;
}