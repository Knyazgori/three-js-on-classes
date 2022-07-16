import Viewer from "./viewer";
import * as THREE from "three";

export default class {
  constructor() {
    Viewer.init();
    // # SOME OBJECT
    this.createObject();
  }
  // # SOME OBJECT
  // Создание какого-то объекта
  createObject() {
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: "pink" })
    );
    Viewer.scene.add(this.object);
    this.object.position.z = -5;

    const that = this;

    Viewer.setUpdate("rotation_object", () => {
      that.object.rotation.y += 0.01;
      that.object.rotation.x += 0.01;
    });
  }
}
