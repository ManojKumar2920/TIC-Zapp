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

  // Calculate canvas size based on screen dimensions
  const getCanvasSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width < 768) { // Mobile
      return {
        width: Math.min(width * 0.95, 500),
        height: Math.min(height * 0.7, 700)
      };
    } else { // Tablet and above
      return {
        width: Math.min(width * 0.95, 800),
        height: Math.min(height * 0.8, 1000)
      };
    }
  };

  useEffect(() => {
    const sizes = getCanvasSize();
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create and position camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 4; // Moved camera closer to make model appear larger
    camera.position.y = 0.5;
    scene.add(camera);
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // Load environment map
    const exrLoader = new EXRLoader();
    exrLoader.load("city.exr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    // Load and setup 3D model with increased scale
    const modelGroup = new THREE.Group();
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./Zapp-red.glb", (gltf) => {
      const model = gltf.scene;
      // Increased scale values
      const scale = window.innerWidth < 768 ? 35 : 50;
      model.scale.set(scale, scale, scale);
      model.children[0].material.roughness = 1;
      
      model.rotation.x = 0;
      model.rotation.y = Math.PI * 0.1;
      model.rotation.z = 0;
      
      modelGroup.add(model);
      modelRef.current = model;
    });
    
    modelGroup.rotation.z = -Math.PI * 0.1;
    scene.add(modelGroup);

    // Setup lighting
    const mainLight = new THREE.DirectionalLight("white", 3);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    
    const backLight = new THREE.DirectionalLight("white", 2);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);
    
    const ambientLight = new THREE.AmbientLight("white", 2);
    scene.add(ambientLight);

    // Setup texture switching
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

    // Handle window resizing
    const handleResize = () => {
      const newSizes = getCanvasSize();
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = newSizes.width / newSizes.height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newSizes.width, newSizes.height);
      }
    };
    window.addEventListener("resize", handleResize);

    // Animation loop with slower rotation
    const clock = new THREE.Clock();
    const tick = () => {
      const deltaTime = clock.getDelta();
      if (modelRef.current) {
        modelRef.current.rotation.y += deltaTime * 0.2;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      requestAnimationFrame(tick);
    };
    tick();

    // Cleanup
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