'use client'
import { toast } from "sonner"

type ToastType = "success" | "error" | "warning" | "info"

export const toastMessage = (
  type: ToastType,
  message: string,
  description?: string
) => {
  const colors: Record<ToastType, string> = {
    success: "#005b9e",
    error: "#D7263D",
    warning: "#FFB400",
    info: "#007BFF",
  }

  toast(message, {
    style: {
      background: colors[type],
      color: type === "warning" ? "#000" : "#fff",
      border: "none",
    },
    description,
  })
}
