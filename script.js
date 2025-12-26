// Abstract Tech Object (Procedural Model)
const group = new THREE.Group();

// Core sphere
const core = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.2, 1),
  new THREE.MeshStandardMaterial({
    color: 0x00f6ff,
    emissive: 0x00f6ff,
    emissiveIntensity: 0.6,
    roughness: 0.2,
    metalness: 0.9
  })
);
group.add(core);

// Orbit rings
for (let i = 0; i < 3; i++) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2 + i * 0.4, 0.03, 16, 100),
    new THREE.MeshStandardMaterial({
      color: 0x00f6ff,
      emissive: 0x00f6ff,
      emissiveIntensity: 0.4
    })
  );
  ring.rotation.x = Math.random() * Math.PI;
  ring.rotation.y = Math.random() * Math.PI;
  group.add(ring);
}

scene.add(group);

// Scroll animation
window.addEventListener('scroll', () => {
  const s = window.scrollY * 0.002;
  group.rotation.y = s;
  group.rotation.x = s * 0.5;
});

// Idle animation
function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.003;
  renderer.render(scene, camera);
}
animate();
