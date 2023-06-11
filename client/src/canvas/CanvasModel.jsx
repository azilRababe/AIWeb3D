import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import { Shirt } from "./Shirt";
import { Backdrop } from "./Backdrop";
import { CameraRig } from "./CameraRig";

export const CanvasModel = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      {/* <CameraRig>
        <Backdrop>
          <Center>
            <Shirt />
          </Center>
        </Backdrop>
      </CameraRig> */}
    </Canvas>
  );
};
