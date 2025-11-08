// R3F.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, useHelper } from "@react-three/drei";
import "./R3F.css";
import { DirectionalLightHelper } from "three";

function RotatingBox() {
    const ref = useRef();

    // Runs every frame
    useFrame((state, delta) => {
        ref.current.rotation.y += delta;
        ref.current.rotation.x += delta * 0.01;
    });

    return (
        <mesh ref={ref} position={[0, 0, 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
}

function Scene() {
    const lightRef = useRef();
    useHelper(lightRef, DirectionalLightHelper, 1, "hotpink");
    return (
        <>
            <OrbitControls />
            <Float>
                <Environment preset="sunset" />
                <directionalLight ref={lightRef} position={[0, 0, 5]} intensity={1} />
                <ambientLight intensity={0.4} />
                <RotatingBox />
            </Float>
        </>
    );
}

export default function R3F() {
    return (
        <Canvas>
            <Scene />
        </Canvas>
    );
}
