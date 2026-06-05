import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlobeBackground() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    canvasRef.current.appendChild(renderer.domElement);

    // Globe Construction — Procedural Grid Lines
    const globeRadius = 1;
    const lineCount = 24;
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1a3c6e,
      transparent: true,
      opacity: 0.6,
    });

    // Latitude rings
    const latitudes = new THREE.Group();
    for (let i = 0; i < lineCount; i++) {
      const phi = (Math.PI * i) / lineCount;
      const radius = Math.sin(phi) * globeRadius;
      if (radius === 0) continue;
      const geometry = new THREE.RingGeometry(radius - 0.005, radius + 0.005, 64);
      const line = new THREE.Mesh(geometry, lineMaterial);
      line.rotation.x = Math.PI / 2;
      latitudes.add(line);
    }

    // Longitude rings
    const longitudes = new THREE.Group();
    for (let i = 0; i < lineCount; i++) {
      const rotationY = (Math.PI * i) / lineCount;
      const geometry = new THREE.RingGeometry(
        globeRadius - 0.005,
        globeRadius + 0.005,
        64
      );
      const line = new THREE.Mesh(geometry, lineMaterial);
      line.rotation.y = rotationY;
      longitudes.add(line);
    }

    const globeGroup = new THREE.Group();
    globeGroup.add(latitudes);
    globeGroup.add(longitudes);
    scene.add(globeGroup);

    // Globe Equator Line
    const equatorGeometry = new THREE.RingGeometry(
      globeRadius + 0.01,
      globeRadius + 0.03,
      64
    );
    const equatorMaterial = new THREE.MeshBasicMaterial({
      color: 0xc9921a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const equator = new THREE.Mesh(equatorGeometry, equatorMaterial);
    equator.rotation.x = Math.PI / 2;
    globeGroup.add(equator);

    // Mouse Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };
      targetRotation.y += deltaMove.x * 0.005;
      targetRotation.x += deltaMove.y * 0.005;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mouseleave', onMouseUp);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y,
      };
      targetRotation.y += deltaMove.x * 0.005;
      targetRotation.x += deltaMove.y * 0.005;
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('touchmove', onTouchMove);
    renderer.domElement.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Auto-rotation
      globeGroup.rotation.y += 0.001;

      // Mouse smoothing
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

      // Apply smoothed rotation
      globeGroup.rotation.x = currentRotation.x;
      globeGroup.rotation.y += currentRotation.y;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Adjust camera z for mobile
      if (window.innerWidth < 768) {
        camera.position.z = 3.5;
      } else {
        camera.position.z = 2.5;
      }
    };

    window.addEventListener('resize', onResize);
    onResize(); // Initial call

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mouseleave', onMouseUp);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      if (canvasRef.current && renderer.domElement.parentNode === canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={canvasRef} className="globe-canvas" />
      <div className="globe-overlay" />
    </>
  );
}
