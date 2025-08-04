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
import { useModifierGroupStore } from "@/store/modifier-group-store";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

type CustomDeleteModalProps = {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  id: string;
};

export function CustomDeleteModal({
  id,
  setShowModal,
  showModal,
}: CustomDeleteModalProps) {
  const deleteModifierGroup = useModifierGroupStore(
    (s) => s.deleteModifierGroup
  );
  const isSubmitting = useModifierGroupStore((s) => s.isSubmitting);
  const status = useModifierGroupStore((s) => s.status);
  const error = useModifierGroupStore((s) => s.error);
  const resetStatus = useModifierGroupStore((s) => s.resetStatus);

  useEffect(() => {
    if (status === "success") {
      toast.success("Deleted successfully!");
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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            table row and its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 cursor-pointer hover:bg-red-600"
            onClick={() => deleteModifierGroup(id)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex gap-2 items-center ">
                <LoaderCircle className="animate-spin size-6" />
                <span>Processing...</span>
              </div>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
