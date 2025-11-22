"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ConfirmActionModalProps {
  open: boolean;
  onClose: () => void;
  title?: string
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  type?: "approve" | "reject" | "default";
}

export default function ConfirmActionModal({
  open,
  onClose,
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  type = "default",
}: ConfirmActionModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getButtonStyle = () => {
    if (type === "reject") return "bg-red-600 hover:bg-red-700";
    if (type === "approve") return "bg-green-600 hover:bg-green-700";
    return "bg-primary hover:bg-primary/90";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle
              className={`h-5 w-5 ${
                type === "reject"
                  ? "text-red-600"
                  : type === "approve"
                  ? "text-green-600"
                  : "text-primary"
              }`}
            />
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className={`${getButtonStyle()} text-white rounded-xl`}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
