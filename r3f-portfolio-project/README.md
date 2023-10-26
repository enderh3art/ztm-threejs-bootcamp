# Portfolio Application

This is a 3D interactive React application that showcases a 3D world environment with a character/avatar. The application includes various components for rendering the environment, character, physics simulations, and interactive portals.

## Project Structure

The project is structured as follows:

```
src/
|-- components/
|   |-- Character.js
|   |-- Environment.js
|   |-- Portal.js
|-- hooks/
|   |-- CharacterController.js
|   |-- ModalInfo.js
|-- store/
|   |-- ModalProvider.js
|-- World/
|   |-- Character.js
|   |-- Environment.js
|   |-- Portal.js
|   |-- World.js
|-- App.js
|-- ...
```

- `components/`: This directory contains React components used for rendering various elements of html, including the a loading screen and modal information.

- `hooks/`: Custom hooks are defined in this directory, enabling functionality such as character control, modal information retrieval, and animations.

- `store/`: This directory contains components related to application state management, such as the ModalProvider for modal content.

- `App.jsx`: The main entry point of the application, where the overall structure and layout are defined.

- `World`: This directory contains the assets related to the 3D environment including the World, Environment, Character, and Portals

## Key Components

1. **Character.jsx**:

   - Represents the character/avatar within the 3D scene.
   - Loads and renders the character model.
   - Configures physics properties, including kinematic movement and collision detection.
   - Preloads the character model for optimized performance.

2. **Environment.jsx**:

   - Renders the 3D model of the environment.
   - Configures lighting, shadows, and scale for the environment.
   - Preloads the environment model for improved loading times.

3. **Portal.jsx**:

   - Represents interactive portals within the 3D environment.
   - Monitors the character's proximity to trigger interactions.
   - Changes portal materials and displays modals when the character approaches.

4. **CharacterController.jsx**:

   - Custom hook for managing character controls and animations.
   - Handles character movement based on keyboard input.
   - Controls character animations and transitions.

5. **ModalInfo.jsx**:

   - Custom hook for managing modal content and visibility.
   - Retrieves modal information and handles modal display and hiding.

6. **ModalProvider.jsx**:

   - Manages the application's modal content and visibility state.
   - Provides modal information and functions to show/hide modals.

7. **World.jsx**:
   - The primary component for the 3D world environment.
   - Sets up physics simulation with gravity.
   - Configures lighting, including ambient and directional light.
   - Renders the character and environment models.

## Getting Started

1. Clone the repository.

2. Install the required dependencies using `npm install`.

3. Run the application using `npm run dev`.

4. Explore the 3D world, interact with portals, and control the character using keyboard input.

## Dependencies

- React: The core library for building the user interface.
- three: A library for creating 3D applications.
- react-three/fiber: A library for creating 3D applications in React from Three.js.
- @react-three/rapier: A physics engine for 3D simulations in React applications.
- @react-three/drei: A collection of useful components and hooks for react-three/fiber.
