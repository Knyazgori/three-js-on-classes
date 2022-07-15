import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  init() {
    // # RENDERER
    this.createRenderer();
    // # CAMERA
    this.createCamera();
    // # SCENE
    this.createScene();
    // # LIGHT
    this.createLight();
    // # ORBIT
    this.createOrbitControls()

    // # UPDATE
    /// Постоянное обновление результата
    this.update();  
  },

  // # RENDERER
  /// Создание рендерера
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();

    document.body.appendChild(this.renderer.domElement);

    this.renderer.setSize(innerWidth, innerHeight);
  },

  // # CAMERA
  /// Создание камеры
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45, //// угол обзора
      innerWidth / innerHeight, //// отношение сторон canvas
      1, //// начало обзора
      10000 //// конец обзора
    );


    this.camera.position.z = 10
  },

  // # SCENE
  /// Создание сцены
  createScene() { 
    this.scene = new THREE.Scene();
  },

  // # LIGHT
  createLight() {
    this.light = new THREE.DirectionalLight(0xffffff, 0.5); //// Солнечный свет
    this.scene.add(this.light);
    this.light.position.set(5, 5, 5);
  },

  // # ORBITCONTROLS
  createOrbitControls() {
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    console.log(this.orbit);
  },

  // # SETUPDATE
  /// Добавление методов
  setUpdate(name, func) {
    this.updatePool[name] = func;
  },

  // # REMOVEUPDATE
  /// Удаление методов
  removeUpdate(name) {
    delete this.updatePool[name]
  },

  //// Сюда будут добавляться все ф-ции, которые должны обновляться каждый кадр
  updatePool:   {},
  // # UPDATE
  update() {
    /// Отрисовка резултата
    this.renderer.render(this.scene, this.camera);
    let that = this;
    requestAnimationFrame(() => that.update());

    for (let key in this.updatePool) {
      this.updatePool[key]();
    }
  },
}
