// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60, window.innerWidth / window.innerHeight, 0.1, 1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 6;

// Lights (neon feel)
scene.add(new THREE.AmbientLight(0x00ffff, 0.6));

const pointLight = new THREE.PointLight(0x00ffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// ⭐ Particles (space)
const particlesGeometry = new THREE.BufferGeometry();
const count = 1500;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 60;
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00f6ff,
  size: 0.05
});

const particles = new THREE.Points(
  particlesGeometry,
  particlesMaterial
);

scene.add(particles);

// Load 3D Model
const loader = new THREE.GLTFLoader();
let model;

loader.load('model.glb', (gltf) => {
  model = gltf.scene;
  model.scale.set(1.6, 1.6, 1.6);
  scene.add(model);
});

// Scroll animation
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (model) {
    model.rotation.y = scrollY * 0.002;
    model.rotation.x = scrollY * 0.001;
  }
  particles.rotation.y = scrollY * 0.0003;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Dark/Light Toggle
document.getElementById('themeToggle').onclick = () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
};
