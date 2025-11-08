import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function MonkModel() {
    const { scene } = useGLTF("/models/monk.gltf");     // in public folder we have to put models
    return <primitive object={scene} scale={2} />;
}

export default function ExtrnalModal() {
    return (
        <Canvas camera={{ position: [3, 2, 5] }}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
                <MonkModel />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
}
