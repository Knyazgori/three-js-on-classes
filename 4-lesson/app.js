import Viewer from "./viewer";
import * as THREE from "three";

export default class {
  constructor() {
    Viewer.init({
      renderer: {
        parent: document.body,
        antialias: true, //// Сглаживание, которое смягчает углы и рёбра на стыке
        alpha: true, //// Прозрачность заднего фона
        clearColor: 'green',
        pixelRatio: 1,
      }
    });
    // # SOME OBJECT
    this.createObject();
  }
  // # SOME OBJECT
  // Создание какого-то объекта
  createObject() {
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(.1, .2, 8),
      new THREE.MeshStandardMaterial({ color: "pink" })
    );
    Viewer.scene.add(this.object);

    this.object.visible = true; //// отвечает за видимость объекта
   
    
    
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(.5, 2, 10),
      new THREE.MeshBasicMaterial({ color: 'yellow' })
    )

    cone.position.set(5, 0, -3)

    Viewer.scene.add(cone)


    const that = this;

    Viewer.addUpdate("rotation_object", () => {
      cone.position.x += 0.2;

      that.object.lookAt(cone.position)

    });
  }
}
