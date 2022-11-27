import * as THREE from 'three'
import {scene} from "./scene";
import {sizes} from "./globalVariable";

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


export { camera }