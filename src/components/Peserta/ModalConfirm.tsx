import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  colorConfirm?: "primary" | "secondary" | "error" | "success";
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title = "Konfirmasi",
  message,
  onClose,
  onConfirm,
  confirmText = "Ya",
  cancelText = "Batal",
  colorConfirm = "primary",
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" color={colorConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
