import * as THREE from "./build/three.module.js";
import {OrbitControls} from "./jsm/controls/OrbitControls.js"

let scene,camera,renderer,pointLight,controls;
 
//シーンを追加
scene = new THREE.Scene();
 
//カメラを追加
camera = new THREE.PerspectiveCamera(
    50, //角度　°
    window.innerWidth / window.innerHeight,//アスペクト比ｗ/ｈ
    0.1,//描画開始距離
    1000//描画終了距離
);
camera.position.set(0,0,500);

//レンダラー追加
renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// テキスチャー
let texttures = new THREE.TextureLoader().load("./textures/earth.jpg");

// ジオメトリを作成
let ballGeometry = new THREE.SphereGeometry(100, 64, 32);
// マテリアルを作成
let ballMaterial = new THREE.MeshPhysicalMaterial({map:texttures});
// メッシュ化
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ballMesh);
// 平行光源
let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1,1,1);
scene.add(directionalLight);

// ポイント光源
pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-200,-200,-200);
scene.add(pointLight);

//ポイントヘルパー
let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
scene.add(pointLightHelper);

// マウス操作
controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    // ポイント光源の巡回
    pointLight.position.set(
        200 * Math.sin(Date.now() / 500),
        200 * Math.sin(Date.now() / 1000),
        200 * Math.cos(Date.now() / 500)
    );
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();


