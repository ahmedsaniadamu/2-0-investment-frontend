"use client";

import { useState } from "react";
import ConfirmActionModal from "./comfirmation-modal";

let resolvePromise: ((value: boolean) => void) | null = null;

export function useConfirmModal() {
  const [modalData, setModalData] = useState<any>(null);

  const confirm = (options: {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    type?: "approve" | "reject" | "default";
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalData({
        open: true,
        ...options,
      });
      resolvePromise = resolve;
    });
  };

  const handleClose = () => {
    setModalData(null);
  };

  const handleConfirm = async () => {
    resolvePromise?.(true);
    handleClose();
  };

  const handleCancel = () => {
    resolvePromise?.(false);
    handleClose();
  };

  const ConfirmModalElement = modalData ? (
    <ConfirmActionModal
      open={modalData.open}
      onClose={handleCancel}
      title={modalData.title}
      description={modalData.description}
      confirmText={modalData.confirmText}
      cancelText={modalData.cancelText}
      type={modalData.type}
      onConfirm={handleConfirm}
    />
  ) : null;

  return { confirm, ConfirmModalElement };
}
