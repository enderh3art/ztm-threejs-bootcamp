// Import necessary libraries and components
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei"; // Uses Zustand underneath the hood
import { Camera } from "./Camera";
import { World } from "./World/World";
import LoadingScreen from "./components/loadingscreen/LoadingScreen";
import { useModalInfo } from "./hooks/ModalInfo";
import Modal from "./components/modal/Modal";
import "./App.css";

// Define control constants for keyboard mapping
export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  // Initialize custom hook for managing modals
  const { getModalInfo, isModalVisible, activeModal, hideModal } =
    useModalInfo();

  // Define key mapping for keyboard controls
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <div className="App">
      {/* Wrap the 3D canvas and controls with KeyboardControls */}
      <KeyboardControls map={map}>
        <Canvas shadows>
          <Suspense fallback={<LoadingScreen />}>
            {/* Render the Camera component */}
            <Camera />
            {/* Render the World component */}
            <World />
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* Display modal if it is visible */}
      {isModalVisible && activeModal && (
        <Modal
          title={getModalInfo(activeModal).title}
          description={getModalInfo(activeModal).description}
          onClose={hideModal}
        />
      )}
    </div>
  );
}

export default App;
