import * as THREE from 'three'
import {scene} from './scene'
import {camera} from './camera'
import {sizes} from "./globalVariable";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {TransformControls} from "three/examples/jsm/controls/TransformControls";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const canvas: HTMLCanvasElement | null = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas as HTMLCanvasElement,
    antialias: true,
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
const orbitControls = new OrbitControls(camera, renderer.domElement)

const transformControls = new TransformControls(camera, renderer.domElement)
scene.add(transformControls)

function setTCTarget(target: any) {
    transformControls.attach(target)
}

transformControls.addEventListener( 'dragging-changed', function ( event ) {
    orbitControls.enabled = ! event.value;
} );

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

new RGBELoader()
    .setPath( 'HDRI/' )
    .load( 'snow_field_2k.hdr', function ( texture ) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    } );


export { renderer, canvas, setTCTarget, transformControls, orbitControls }