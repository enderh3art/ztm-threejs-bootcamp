import React, { createContext, useState } from "react";

// Create a context for managing modal content and visibility
const ModalContentContext = createContext();

/**
 * A provider component for managing modal content and visibility in the application.
 * It stores predefined modal content and handles modal visibility state.
 * @param {Object} children - The child components wrapped by this provider.
 */
function ModalContentProvider({ children }) {
  // Define predefined modal content as an object
  const [modalContents] = useState({
    aboutMe: {
      title: "About me",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    projects: {
      title: "Projects",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    contactMe: {
      title: "Contact Me",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  });

  // State to track the name of the active modal and its visibility
  const [activeModal, setActiveModal] = useState(null); // Name of the active modal
  const [isModalVisible, setModalVisible] = useState(false); // Visibility of the modal

  // Function to retrieve modal information based on the portal name
  const getModalInfo = (portalName) => {
    return modalContents[portalName];
  };

  // Function to show a specific modal by setting its name and visibility
  const showModal = (portalName) => {
    setActiveModal(portalName);
    setModalVisible(true);
  };

  // Function to hide the active modal by resetting its name and visibility
  const hideModal = () => {
    setActiveModal(null);
    setModalVisible(false);
  };

  // Provide the modal-related functions and data to child components through the context
  return (
    <ModalContentContext.Provider
      value={{
        getModalInfo,
        showModal,
        hideModal,
        activeModal,
        isModalVisible,
      }}
    >
      {children}
    </ModalContentContext.Provider>
  );
}

// Export the ModalContentProvider and ModalContentContext for use in other components
export { ModalContentProvider, ModalContentContext };
