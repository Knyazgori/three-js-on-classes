import Viewer from "./viewer";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class {
  constructor() {
    Viewer.init();
    // # SOME OBJECT
    this.createObject();
  }

  createObject() {
    this.loader = new GLTFLoader();
    this.clock = new THREE.Clock();

    let mixer;
    this.obj = null;

    const that = this;

    this.loader.load("./copyIcon.gltf", function (gltf) {
      that.obj = gltf;

      mixer = new THREE.AnimationMixer(that.obj.scene);
      mixer.clipAction(that.obj.animations[0]).play(); // <- первая по списку анимация



      Viewer.scene.add(that.obj.scene);
      console.log(that.obj);
      console.log(that.obj.animations);
    });

    Viewer.setUpdate("rotation_object", () => {
      mixer.update(that.clock.getDelta());
    });
  }
}


