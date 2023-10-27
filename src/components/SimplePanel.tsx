import React, { useRef, useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Props extends PanelProps<SimpleOptions> { }

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const containerRef = useRef(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!renderer.current) {
      renderer.current = new THREE.WebGLRenderer({ antialias: true });
      containerRef.current?.appendChild(renderer.current.domElement);
    }
  }, []);

  useEffect(() => {
    if (renderer.current) {
      renderer.current.setSize(width, height);
    }

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;

    // Load the GLB model
    const loader = new GLTFLoader();
    const url = 'https://generalai.in/tanmay/models/elecMicroscope.glb';
    loader.load(url, (gltf) => {
      // Adding to scene
      const model = gltf.scene;
      model.name = 'electroMicroScope';
      scene.add(model);

      // Controls
      const controls = new OrbitControls(camera, renderer.current!.domElement);
      controls.enableDamping = true; // Add damping for smoother interaction
      controls.dampingFactor = 0.1;
      controls.rotateSpeed = 0.5;

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Add hemisphere light
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 3.0);
      scene.add(hemisphereLight);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        const model = scene.getObjectByName('electroMicroScope');
        if (model) {
          model.rotation.y += 0.01;
        }
        renderer.current!.render(scene, camera);
      };

      animate();
    });
  }, [width, height]);

  return (
    <div
      className={cx(
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
      ref={containerRef}
    ></div>
  );
};