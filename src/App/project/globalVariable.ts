import * as THREE from 'three'
import { renderer } from './renderer'
import * as ob from '../components/observer'

const canvas = document.querySelector('canvas.webgl') as HTMLElement
const parent = canvas.parentElement as HTMLElement

let sizes = {
    width: parent.clientWidth,
    height: parent.clientHeight
}

interface itf_cursorPosition {
    x: number,
    y: number
}

const cursorPosition: itf_cursorPosition = {
    x: 0,
    y: 0
}


export let export_file: Object = {}
export const allOutlineContent = new ob.observable([] as (THREE.Mesh | THREE.Object3D)[])

export function set_export_file() {
    let objectArray: (THREE.Mesh | THREE.Object3D)[] = []

    allOutlineContent.get().map((element: THREE.Mesh | THREE.Object3D) => {
        let type: String
        let position: THREE.Vector3
        let rotation: THREE.Euler
    
        if (element instanceof THREE.Mesh) {

            type = element.geometry.type
            position = element.position
            rotation = element.rotation
        } else {

            const children = element.children[0]
            position = element.position
            rotation = element.rotation

            if (children instanceof THREE.Mesh) {
                type = children.geometry.type
            } else {
                type = 'Group'
            }
        }

        if (element instanceof THREE.Mesh || element instanceof THREE.Object3D) {

            
            if (type && position && rotation) {
                const item: Object | any = 
                {
                    config: {
                        type: type,
                        position: position,
                        rotation: rotation
                    },
                    userData: element.userData
                }
                if (item instanceof Object) {
                    objectArray.push(item)
                }
            }
        }
    })

    export_file = objectArray
    console.log(export_file)
}

export function add_outline_content(element: THREE.Mesh | THREE.Object3D) {
    allOutlineContent.push((element as THREE.Mesh | THREE.Object3D))
}


function updateSize() {
    sizes.width = parent.clientWidth
    sizes.height = parent.clientHeight
}

export let mouse: any

window.addEventListener('mousemove', (event) => {
    cursorPosition.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    cursorPosition.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    mouse = {
        x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
    }
})
export { sizes, cursorPosition, parent, updateSize }
