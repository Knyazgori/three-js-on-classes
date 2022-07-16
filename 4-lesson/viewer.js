import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export default {
  init(data) {
    // # CREATERESIZE
    this.createResize();
    // # RENDERER
    this.createRenderer(data.renderer);
    // # CAMERA
    this.createCamera();
    // # SCENE
    this.createScene();
    // # LIGHT
    this.createLight();
    // # ORBITCONTROLS
    this.createOrbitControls();

    // # UPDATE
    /// Постоянное обновление результата
    this.update();

    // # RESIZE
    /// Постоянное обновление размеров
    this.resize();
  },

  // # RENDERER
  /// Создание рендерера
  createRenderer(settings) {
    const that = this;

    if (this.renderer) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      //// очистка памяти
      this.renderer.dispose();
    }

    this.renderer = new THREE.WebGLRenderer(settings);

    settings.parent.appendChild(this.renderer.domElement);

    this.renderer.setClearColor(settings.clearColor || "black"); //// ставим произволное или чёрный цвет

    this.renderer.setPixelRatio(settings.pixelRatio || devicePixelRatio); //// ставим произволное или браузерное значение

    this.addResize("resize_render", () => {
      that.renderer.setSize(innerWidth, innerHeight);
    });

    this.resizePool["resize_render"]();
  },

  // # CREATERESIZE
  createResize() {
    const that = this;
    window.addEventListener("resize", () => {
      that.resize();
    });
  },

  //// Сюда будут добавляться данные об изменении размеров
  resizePool: {},
  addResize(name, func) {
    this.resizePool[name] = func;
  },

  removeResize(name) {
    delete this.resizePool[name];
  },

  // # RESIZE
  resize() {
    for (let key in this.resizePool) {
      this.resizePool[key]();
    }
  },

  // # CAMERA
  /// Создание камеры
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45, //// угол обзора
      this.renderer.domElement.width / this.renderer.domElement.height, //// отношение сторон canvas
      1, //// начало обзора
      100 //// конец обзора
    );

    const that = this;

    this.addResize("resize_camera", () => {
      that.camera.aspect =
        that.renderer.domElement.width / that.renderer.domElement.height; //// меняем аспект, то есть отношение сторон, чтобы картинка не была сжата

      that.camera.updateProjectionMatrix(); //// а затем делаем обновление, с помощью .updateProjectionMatrix()
    });

    this.camera.position.set(0, 0, 20);
    // this.camera.lookAt(0, 0, 0);
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
    this.light.position.set(0, 20, -10);

    this.light1 = new THREE.AmbientLight(0xffffff, 0.5); //// Насыщенный свет
    this.scene.add(this.light1);
    this.light1.position.set(0, 20, 10);


  },

  // # ORBITCONTROLS
  createOrbitControls() {
    new OrbitControls(this.camera, this.renderer.domElement);
  },

  // # ADDUPDATE
  /// Добавление методов
  addUpdate(name, func) {
    this.updatePool[name] = func;
  },

  // # REMOVEUPDATE
  /// Удаление методов
  removeUpdate(name) {
    delete this.updatePool[name];
  },

  //// Сюда будут добавляться все ф-ции, которые должны обновляться каждый кадр
  updatePool: {},
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
};
