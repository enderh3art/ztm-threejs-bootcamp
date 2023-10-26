import { useThree } from "@react-three/fiber";
import { useCubeTexture } from "@react-three/drei";

export function Background() {
  const { scene } = useThree();

  const backgroundCubemap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    {
      path: "/textures/cubeMap/",
    }
  );

  scene.background = backgroundCubemap;

  return null;
}
