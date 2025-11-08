// R3F.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";

export default function R3F() {
    return (
        <>
            <Canvas>
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <ambientLight position={[-5, -5, -5]} intensity={0.5} />
                <mesh>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </Canvas>
        </>
    );
}
