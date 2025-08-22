import React from "react";
import { StyledSnackbar } from "./Snackbar.styles";

interface SnackbarProps {
  message: string;
  isVisible: boolean;
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return <StyledSnackbar $isVisible={isVisible}>{message}</StyledSnackbar>;
};

Snackbar.displayName = "Snackbar";
