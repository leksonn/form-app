import React from "react";

interface SnackbarProps {
  message: string;
  isVisible: boolean;
}

export const Snackbar: React.FC<SnackbarProps> = ({ message, isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#333",
        color: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        textAlign: "center",
        whiteSpace: "nowrap",
        transition: "opacity 0.3s ease-in-out",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {message}
    </div>
  );
};
