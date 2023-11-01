import React, { useRef, useEffect } from "react";
import * as THREE from "three";
/* import crossimg from "./assets/cross.png"; */
const Part = () => {
  const canvasref = useRef();

  useEffect(() => {
    /* const loader=new THREE.TextureLoader();
    const cross=loader.load(crossimg) */

    const scene = new THREE.Scene();
    const particleGeometry = new THREE.BufferGeometry();
    const particlecont = 500;

    const postArray = new Float32Array(particlecont * 3);

    for (let i = 0; i < particlecont * 3; i++) {
      postArray[i] = (Math.random() - 0.5) * 5;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(postArray, 3)
    );

    //Material
    const material = new THREE.PointsMaterial({
      size: 0.005,
      /* map:cross,
      transparent:true, */
    });
    //Mesf
    const particlemesh = new THREE.Points(particleGeometry, material);
    scene.add(particlemesh);

    //Size
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    //light
    const light = new THREE.PointLight(0xffffff, 0.1);
    light.position.set(2, 3, 4);
    scene.add(light);
    //camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 2;
    scene.add(camera);

    const canvas = canvasref.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(3);
    renderer.render(scene, camera);
    console.log("Renderer and scene setup completed.");

    
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      //update camera
      camera.aspect = sizes.width / sizes.height;
      /* camera.updateProjectionMatrix(); */
      renderer.setSize(sizes.width, sizes.height);
    });
   /*  document.addEventListener("mousemove", animate);
    let mouseX = 0;
    let mouseY = 0;

    function animate(e) {
      mouseX -= e.clientX;
      mouseY -= e.clientY;
    } */
  }, []);
  return (
    <>
      <canvas ref={canvasref}></canvas>
    </>
  );
};

export default Part;
