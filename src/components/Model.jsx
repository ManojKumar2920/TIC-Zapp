import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterEffectSmooth } from "../components/writer";
import ZappIcon from '../assets/zapp-icon.png';

const Model = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const duration = 4000;

  const texts = [
    "Connect with like-minded companions, exciting events, and vibrant communities as you trot the globe.",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque corporis eveniet non ipsum, ex, qui esse maiores doloremque illum recusandae repudiandae quisquam culpa quae et! Praesentium officia et neque ut!",
  ];

  // Calculate canvas size based on screen width
  const getCanvasSize = () => {
    const width = window.innerWidth;
    if (width < 1024) { // md breakpoint
      return { width: 400, height: 500 };
    } else { // lg and above
      return { width: 500, height: 700 };
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, duration);
    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    // Only initialize Three.js if screen is large enough
    if (window.innerWidth < 768) return; // Skip initialization for mobile

    const sizes = getCanvasSize();
    
    // Create the scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 5;
    scene.add(camera);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // Load EXR texture
    const exrLoader = new EXRLoader();
    exrLoader.load("city.exr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });

    // Load GLTF model
    const modelGroup = new THREE.Group();
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./Zapp-red.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(30, 30, 30);
      model.children[0].material.roughness = 1;
      modelGroup.add(model);
      modelRef.current = model;
    });
    modelGroup.rotation.z = -0.8;
    scene.add(modelGroup);

    // Lights
    const light = new THREE.DirectionalLight("white", 2);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight("white", 2);
    scene.add(ambientLight);

    // Textures for toggle
    const greenTexture = new THREE.TextureLoader().load("green.jpg");
    greenTexture.flipY = false;
    greenTexture.colorSpace = THREE.SRGBColorSpace;
    const redTexture = new THREE.TextureLoader().load("red.png");
    redTexture.flipY = false;
    redTexture.colorSpace = THREE.SRGBColorSpace;

    let toggle = true;

    // Toggle textures every 2 seconds
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

    // Handle resizing
    const handleResize = () => {
      const newSizes = getCanvasSize();
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = newSizes.width / newSizes.height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newSizes.width, newSizes.height);
      }
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    const tick = () => {
      const deltaTime = clock.getDelta();
      if (modelRef.current) {
        modelRef.current.rotation.y += deltaTime;
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      requestAnimationFrame(tick);
    };
    tick();

    // Clean up
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
    <div id="product" className="relative w-full h-[60dvh] md:h-dvh  px-4 py-8 flex flex-col lg:flex-row items-center justify-center gap-8">
      {/* Model Section - Hidden on mobile */}
      <div className="hidden md:flex w-full lg:w-1/2 justify-center items-center">
        <div style={{ width: sizes.width, height: sizes.height }} className="relative">
          <canvas ref={canvasRef} className="webgl" />
        </div>
      </div>

      {/* Text Section - Full width on mobile */}
      <div className="w-full lg:w-1/2 px-4 lg:px-8 flex justify-center items-center">
        {/* Background Image behind text */}
        <div className="absolute z-0 opacity-30">
          <img 
            src={ZappIcon} 
            alt="Zapp" 
            className="w-full max-w-sm md:max-w-md lg:max-w-lg" 
          />
        </div>

        <div className="relative z-10 max-w-xl">
          <h1 className="text-lg sm:text-xl lg:text-2xl text-start leading-relaxed">
            While others give you bloated cans of sugar and gas, we went
            straight for the good stuff—
            <span className="text-[#C10000]">high caffeine</span>, 
            <span className="text-[#B9D432]">zero sugar</span>, and a shot
            that fits in your pocket. Zapp isn't here to make you "feel the
            buzz" or give you a sugar high followed by a crash. We're here to do
            one job: give you real energy, 
            <span className="text-[#C10000]">minus</span> the gimmicks.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Model;