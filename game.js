// Configurando cena
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
// Rendarizador
const renderer = new THREE.WebGLRenderer();
// Tamanho da tela
renderer.setSize(window.innerWidth, window.innerHeight);
// Linkando o rederizador
document.body.appendChild(renderer.domElement);

// Instanciando o loader
const loader = new THREE.GLTFLoader();

// Carregando Árvore
loader.load("../tree/scene.gltf",function(gltf){
    scene.add(gltf.scene);
    gltf.scene.scale.set(16, 16, 16);
    gltf.scene.position.set(0, -6, -12);
})

// Classe player
class Player{
    constructor(){
        const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const material = new THREE.MeshBasicMaterial({color: 0xffffff});
        const player = new THREE.Mesh(geometry, material);
        scene.add(player);
        this.player = player;

        player.position.x = 3;
        player.position.y = 0;
        player.position.z = 0;

        this.playerInfo={
            positionX: 6,
            velocity: 0
        }
    }

    anda(){
        this.playerInfo.velocity = 0.1;
    }

    update(){
        this.playerInfo.positionX -= this.playerInfo.velocity;
        this.player.position.x = this.playerInfo.positionX;
    }

    para(){
        this.playerInfo.velocity = 0;
    }
}


// Classe boneca
class boneca{
    constructor(){
        loader.load("../model/scene.gltf", (gltf)=>{
        scene.add(gltf.scene);
        gltf.scene.scale.set(0.4, 0.4, 0.4);
        gltf.scene.position.set(0, -1, 0)
        this.Boneca1 = gltf.scene;
        })
    }
    praTras(){
        gsap.to(this.Boneca1.rotation, {y:-3.15, duration: 1});
    }
    praFrente(){
        gsap.to(this.Boneca1.rotation, {y:0, duration: 1});
    }
}

let Player1 = new Player();
let Boneca1 = new boneca();
setTimeout(()=>{
    Boneca1.praTras},1000);

// Adicionando Luz
const light = new THREE.AmbientLight(0xFFFFFF);
scene.add(light);

renderer.setClearColor(0x8601af,1)

// Config. profundidade da camera
camera.position.z = 5;

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    Player1.update();
}

animate();

// Capturando a alteração da resolução da tela
window.addEventListener('resize', onWindowResize, false)
// Função que torna  atela responsiva
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}

// Pressione a tecla
window.addEventListener('keydown', function(e){
    if(e.keyCode == 37){
        Player1.anda();
        console.log(false);
    }
    console.log(true);
})


// libera a tecla
window.addEventListener('keyup', function(e){
    if(e.keyCode == 37){
        Player1.para();
    }
})