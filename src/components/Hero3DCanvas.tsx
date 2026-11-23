import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 320;
    const height = mount.clientHeight || 320;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // Group to hold all 3D components
    const techGroup = new THREE.Group();
    scene.add(techGroup);

    // 1. Outer wireframe Icosahedron (Geometric AI crystal structure)
    const icoGeometry = new THREE.IcosahedronGeometry(1.65, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // vibrant purple
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, wireframeMaterial);
    techGroup.add(icoMesh);

    // 2. Inner pulsating Core (represents AI Neural Core)
    const coreGeometry = new THREE.IcosahedronGeometry(0.9, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // vibrant cyan/sky blue
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    techGroup.add(coreMesh);

    // 3. Orbital Ring 1
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.018, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    techGroup.add(ring1);

    // 4. Orbital Ring 2 (Cross orbit)
    const ringGeo2 = new THREE.TorusGeometry(2.35, 0.015, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 2.5;
    ring2.rotation.z = Math.PI / 4;
    techGroup.add(ring2);

    // 5. Floating satellite vertices/dots around core
    const dotCount = 18;
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      const theta = (i / dotCount) * Math.PI * 2;
      const radius = 1.8 + Math.sin(i * 3) * 0.3;
      dotPositions[i * 3] = Math.cos(theta) * radius;
      dotPositions[i * 3 + 1] = Math.sin(theta) * radius;
      dotPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    techGroup.add(dots);

    // Mouse Tracking for tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;
    };

    const onMouseEnter = () => {
      isHovered = true;
    };
    const onMouseLeave = () => {
      isHovered = false;
      mouseX = 0;
      mouseY = 0;
    };

    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseenter', onMouseEnter);
    mount.addEventListener('mouseleave', onMouseLeave);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(mount);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Slow idle rotation + mouse responsiveness
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      const hoverSpeed = isHovered ? 1.8 : 1.0;

      icoMesh.rotation.x = time * 0.25 * hoverSpeed + targetY * 0.4;
      icoMesh.rotation.y = time * 0.35 * hoverSpeed + targetX * 0.4;

      coreMesh.rotation.x = -time * 0.4 * hoverSpeed;
      coreMesh.rotation.y = -time * 0.5 * hoverSpeed;
      const scale = 0.95 + Math.sin(time * 2) * 0.06;
      coreMesh.scale.set(scale, scale, scale);

      ring1.rotation.z = time * 0.2 * hoverSpeed;
      ring2.rotation.x = time * 0.15 * hoverSpeed;

      dots.rotation.y = time * 0.1;

      // Float effect on group
      techGroup.position.y = Math.sin(time * 1.5) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('mouseenter', onMouseEnter);
      mount.removeEventListener('mouseleave', onMouseLeave);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      icoGeometry.dispose();
      wireframeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      id="hero-3d-canvas-container"
      className="w-full h-full min-h-[260px] sm:min-h-[320px] md:min-h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing relative"
      title="Interactive 3D AI Core - Move cursor to rotate"
    />
  );
};
