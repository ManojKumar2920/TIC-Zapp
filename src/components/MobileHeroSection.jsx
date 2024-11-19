import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';
import Navbar from './Navbar';

const MobileHeroSection = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);

  const getCanvasSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width < 768) {
      return {
        width: Math.min(width * 0.95, 500),
        height: Math.min(height * 0.7, 700)
      };
    } else {
      return {
        width: Math.min(width * 0.95, 800),
        height: Math.min(height * 0.8, 1000)
      };
    }
  };

  useEffect(() => {
    const sizes = getCanvasSize();
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 4;
    camera.position.y = 0.5;
    scene.add(camera);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    const exrLoader = new EXRLoader();
    exrLoader.load("city.exr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    // Modified model group with initial rotation
    const modelGroup = new THREE.Group();
    modelGroup.rotation.z = -Math.PI * 0.10; // Increased tilt angle
    modelGroup.rotation.x = Math.PI * 0.05; // Added slight forward tilt
    
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./Zapp-red.glb", (gltf) => {
      const model = gltf.scene;
      const scale = window.innerWidth < 768 ? 35 : 50;
      model.scale.set(scale, scale, scale);
      model.children[0].material.roughness = 1;
      
      // Modified model rotation for crossed effect
      model.rotation.x = Math.PI * 0.03; // Slight forward tilt
      model.rotation.y = Math.PI * 0.10; // Increased side rotation
      model.rotation.z = Math.PI * 0.06; // Added slight twist
      
      modelGroup.add(model);
      modelRef.current = model;
    });
    
    scene.add(modelGroup);

    const mainLight = new THREE.DirectionalLight("white", 3);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    
    const backLight = new THREE.DirectionalLight("white", 2);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);
    
    const ambientLight = new THREE.AmbientLight("white", 2);
    scene.add(ambientLight);

    const greenTexture = new THREE.TextureLoader().load("green.jpg");
    greenTexture.flipY = false;
    greenTexture.colorSpace = THREE.SRGBColorSpace;
    const redTexture = new THREE.TextureLoader().load("red.png");
    redTexture.flipY = false;
    redTexture.colorSpace = THREE.SRGBColorSpace;

    let toggle = true;
    const intervalId = setInterval(() => {
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child.name === "Bottle") {
            child.material.map = toggle ? greenTexture : redTexture;
          }
        });
        toggle = !toggle;
      }
    }, 2000);

    const handleResize = () => {
      const newSizes = getCanvasSize();
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = newSizes.width / newSizes.height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newSizes.width, newSizes.height);
      }
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    const tick = () => {
      const deltaTime = clock.getDelta();
      if (modelRef.current) {
        // Reduced rotation speed for better visibility of the crossed position
        modelRef.current.rotation.y += deltaTime * 0.15;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  const sizes = getCanvasSize();

  return (
    <div id="hero-section" className="relative w-screen h-screen overflow-hidden bg-black">
      <Navbar />
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div style={{ width: sizes.width, height: sizes.height }} className="relative">
          <canvas ref={canvasRef} className="webgl" />
        </div>
      </div>
    </div>
  );
};

export default MobileHeroSection;