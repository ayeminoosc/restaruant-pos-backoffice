"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type CustomDeleteModalProps = {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  id: string;
  onDelete: (id: string) => void;
  isSubmitting: boolean;
  status: "idle" | "success" | "error";
  error?: string | null;
  resetStatus: () => void;
};

export function CustomDeleteModal({
  id,
  setShowModal,
  showModal,
  onDelete,
  isSubmitting,
  status,
  error,
  resetStatus,
}: CustomDeleteModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (status === "success") {
      toast.success(t("modifier_group.messages.success_delete"));
      setShowModal(false);
      resetStatus();
    } else if (status === "error" && error) {
      toast.error(error);
      resetStatus();
    }
  }, [status]);

  return (
    <AlertDialog open={showModal} onOpenChange={setShowModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmations.delete")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("confirmations.delete_message")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>
            {t("buttons.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 cursor-pointer hover:bg-red-600"
            onClick={() => onDelete(id)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex gap-2 items-center ">
                <LoaderCircle className="animate-spin size-6" />
                <span> {t("statuses.delete")}</span>
              </div>
            ) : (
              <>{t("buttons.delete")}</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
