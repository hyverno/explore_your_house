import * as THREE from 'three'
import {renderer, setTCTarget, transformControls, canvas} from "./project/renderer";
import {camera} from "./project/camera";
import * as GB from "./project/globalVariable";
import {scene} from './project/scene'
import './project/settings'
import {EDITOR_import} from "./project/ImportGLTF";
import { listObject, createObject } from './project/createObject';
import './project/button'
import { getAllObjectByUserData } from './project/customFunction';
import {refreshParams} from "./project/outliner";


new createObject(listObject.plane,true,0x4f4f4f)


window.addEventListener('resize', () => {
    GB.updateSize()
    console.log(GB.sizes)

    camera.aspect = GB.sizes.width / GB.sizes.height
    renderer.setSize(GB.sizes.width, GB.sizes.height)
})

EDITOR_import('mesh/monkey.gltf')

const raycaster = new THREE.Raycaster();

function tick() {
    render()
    animation()
    requestAnimationFrame(tick)
}

let a = false
let response: THREE.Object3D<THREE.Event>[] = []

canvas?.addEventListener('click', () => {
    if (a === false) {
        response = []
        scene.traverse((e: THREE.Object3D) => {
            if (e instanceof THREE.Mesh && e.userData.componentTags !== undefined || null) {
                response.push(e)
            } else if (e instanceof THREE.Mesh && e.parent?.userData.componentTags !== undefined || null) {
                response.push(e)
            }
        })

        raycaster.setFromCamera(GB.mouse, camera)
        const intersects = raycaster.intersectObjects( response );


        if (intersects.length >= 1) {
            setTCTarget(intersects[ 0 ].object)
            console.log('==== ==== ====')
            console.log(intersects[0].object.parent)
            console.log('==== ==== ====')
            if (intersects[0].object instanceof THREE.Mesh && intersects[0].object.userData.data) {
                refreshParams(intersects[0].object.uuid)
            } else if (intersects[0].object.parent instanceof THREE.Group) {
                refreshParams(intersects[0].object.parent.uuid)
            }
            transformControls.enabled = true
        } else {
            transformControls.enabled = false
            setTCTarget(camera)
        }
    }
})


function render() {
    renderer.render(scene, camera)
}

function animation(){
    // any animation
}

tick()

getAllObjectByUserData()
