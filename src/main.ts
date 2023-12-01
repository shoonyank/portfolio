import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene  = new THREE.Scene();
 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
 
const renderer = new THREE.WebGLRenderer({
 canvas: document.querySelector('#bg'),
});
 
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry =  new THREE.TorusGeometry(10,3,16,100);
// const wireframeMaterial =  new THREE.MeshBasicMaterial({color:0xFF6347, wireframe:true});
const material =  new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// lightning
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper);
// scene.add(gridHelper);   // adds 2d grid horizontal
const controls = new OrbitControls(camera,renderer.domElement);

// ADD MANY OBJECTS
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);
  const [x,y,z]= Array(3).fill('#ffffff').map(()=> THREE.MathUtils.randFloatSpread(100))
  
  star.position.set(x,y,z);
  scene.add(star)
}
  
Array(250).fill('#ffffff').forEach(addStar);
  
const spaceTexture = new THREE.TextureLoader().load('../public/img/space-texture.jpg');
scene.background = spaceTexture;
const avatarTexture = new THREE.TextureLoader().load('../public/img/space-texture.jpg');
 
const avatar = new THREE.Mesh(
 new THREE.BoxGeometry(5,5,5),
 new THREE.MeshBasicMaterial({map: avatarTexture})
);
 
scene.add(avatar);

const planetTexture = new THREE.TextureLoader().load('../public/img/space-texture.jpg');
 
 
const planet =  new THREE.Mesh(
 new THREE.SphereGeometry(3,32,32),
 new THREE.MeshStandardMaterial({map: planetTexture,})
);
 
scene.add(planet);
 
planet.position.z = 30;
planet.position.setX(-10);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  planet.rotation.x += 0.05;
  planet.rotation.y += 0.075;
  planet.rotation.z += 0.05;
  
  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;
  
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
 
document.body.onscroll = moveCamera

function animate(){
  controls.update();
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.y += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();