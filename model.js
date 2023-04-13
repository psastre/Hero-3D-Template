const canvas = document.querySelector('.plant3D');

// Crea la escena, la cámara y el renderizador
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)
const camera = new THREE.PerspectiveCamera(75, canvas.innerWidth / canvas.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(canvas.inerWidth, canvas.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


function onCanvasResize() {
    const { width, height } = canvas.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  // Llama a onCanvasResize una vez al principio para ajustar el tamaño inicial
  onCanvasResize();
  
  // Agrega un listener al evento 'resize' del canvas para actualizar el tamaño del renderizador
  window.addEventListener('resize', onCanvasResize);

// Agrega una luz direccional a la escena







const planeGeometry = new THREE.PlaneGeometry(20,20);
const planeMaterial = new THREE.ShadowMaterial({ color: 0xe5e5e5 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.castShadow = true;
plane.rotation.x = -70 * (Math.PI / 180);
plane.position.y = -1.1;
plane.position.z = 0;



// Agrega el suelo a la escena
scene.add(plane);


// Carga el modelo con GLTFLoader
const loader = new THREE.GLTFLoader();
loader.load('plant3d/scene.gltf', function (gltf) {
    let model = gltf.scene;
  // Agrega el modelo a la escena
  scene.add(model);

  // Ajusta la posición de la cámara para que el modelo sea visible
  camera.position.z = 0;
  camera.position.y = 0.2;
  model.position.z = -1.5
  model.rotation.y= 2.4;
  model.rotation.x= 0.2;


    

      model.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          
        }
     });
     
     
     


      const light = new THREE.PointLight(0xffffff, 2);
      const ambLight = new THREE.AmbientLight(0xffffff,1.5 )
      light.position.set(2, 2, 0.5);
      light.castShadow = true;
      
      
      
      
      light.shadow.camera.left = -10;
      light.shadow.camera.right = 10;
      light.shadow.camera.top = 10;
      light.shadow.camera.bottom = -10;
      light.shadow.camera.near = 0.1;
      light.shadow.camera.far = 25;

      light.target = model

      var mouse = {
        x: 0,
        y: 0
      };
      function onMouseMove(event) {

        // Update the mouse variable
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 3.5 - 2.5 ;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
       
        light.position.set( mouse.x, 2, 0 );
    }
    document.addEventListener('mousemove', onMouseMove);
      
      scene.add(light);
      scene.add(ambLight);

      
  
  // Renderiza la escena
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
 

  const loop =()=>{
        
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()
  
}
);

