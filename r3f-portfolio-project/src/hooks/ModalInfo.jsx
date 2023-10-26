import { useContext } from "react";
import { ModalContentContext } from "../providers/ModalProvider";

/**
 * Custom hook for accessing modal-related information and actions.
 * It retrieves the modal context from the ModalProvider.
 * @returns {Object} An object containing modal-related functions and data.
 * @throws {Error} Throws an error if used outside a ModalContentProvider.
 */
function useModalInfo() {
  // Use the useContext hook to access the ModalContentContext
  const context = useContext(ModalContentContext);

  // Check if the context is available; throw an error if not
  if (!context) {
    throw new Error("useModalInfo must be used within a ModalContentProvider");
  }

  // Return the modal-related functions and data from the context
  return context;
}

export { useModalInfo };
