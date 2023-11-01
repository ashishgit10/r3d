import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const Sphere = () => {
  const canvasref = useRef();
  useEffect(() => {
    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: "#00ff83",
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    //light
    const light = new THREE.PointLight(0xffffff, 100, 100);
    light.position.set(0, 10, 10);
    scene.add(light);
    //camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
    camera.position.z = 15;
    scene.add(camera);

    //Renderer
    /* const canvas = document.querySelector('.webgl') */
    const canvas = canvasref.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(3);
    renderer.render(scene, camera);
    console.log("Renderer and scene setup completed.");

    const control = new OrbitControls(camera, canvas);
    control.enableDamping = true;
    control.enablePan = false;
    control.enableZoom = false;
    control.autoRotate = true;
    control.autoRotateSpeed=5
    //resize
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      //update camera
      camera.aspect = sizes.width / sizes.height;
      /* camera.updateProjectionMatrix(); */
      renderer.setSize(sizes.width, sizes.height);
    });

    const loop = () => {
      control.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };
    loop();
    //timeline
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
  }, []);
  return (
    <>
      <canvas ref={canvasref}></canvas>
    </>
  );
};

export default Sphere;
