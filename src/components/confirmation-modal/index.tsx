"use client";

import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  icon?: ReactNode;
  variant?: "delete" | "warning" | "info";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cancelText = "Kembali",
  confirmText = "Iya, saya yakin",
  icon,
  variant = "delete",
}: ConfirmationModalProps) {
  // Determine button and icon styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case "delete":
        return {
          confirmButtonVariant: "destructive",
          iconBackground: "bg-red-50 p-1 rounded-full",
          iconColor: "text-red-500",
        };
      case "warning":
        return {
          confirmButtonVariant: "warning",
          iconBackground: "bg-amber-50 p-1 rounded-full",
          iconColor: "text-amber-500",
        };
      case "info":
        return {
          confirmButtonVariant: "default",
          iconBackground: "bg-blue-50 p-1 rounded-full",
          iconColor: "text-blue-500",
        };
      default:
        return {
          confirmButtonVariant: "destructive",
          iconBackground: "bg-red-50 p-1 rounded-full",
          iconColor: "text-red-500",
        };
    }
  };

  const { confirmButtonVariant, iconBackground, iconColor } =
    getVariantStyles();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center mb-4">
            {icon ? (
              icon
            ) : (
              <div className={`${iconBackground} p-6 rounded-full`}>
                <div className={`${iconColor} bg-red-100 p-4 rounded-full`}>
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
            )}
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center pt-2">
            {description}
          </DialogDescription>
        </div>
        <DialogFooter className="flex flex-row sm:justify-center gap-2 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-initial"
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmButtonVariant as any}
            onClick={onConfirm}
            className="flex-1 sm:flex-initial bg-red-500 hover:bg-red-600"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
