import * as THREE from 'three'
import {getAllObjectByUserData} from "./customFunction";
import {scene} from "./scene";
import {add_outline_content, set_export_file} from "./globalVariable";
import {setTCTarget} from './renderer'

interface itf_params {
    name: string,
    id: string
}

export function addOutlinerObject(params: itf_params) {
    const outline = document.getElementById('outliner')
    outline.insertAdjacentHTML('beforeend',
        `
            <div class="outline_btn overA1" data-uuid="${params.id}">
                <p>
                    ${params.name}
                </p>
            </div>
        `)
    const outline_btn: HTMLElement = outline.querySelector(`.outline_btn[data-uuid="${params.id}"]`)
    let uuid: string
    outline_btn.addEventListener('click', () => {
        if(outline_btn instanceof HTMLElement) {
            uuid = outline_btn.dataset.uuid
            refreshParams(uuid)
            setTCTarget(scene.getObjectByProperty('uuid', uuid))
        }
    })
    if(outline_btn instanceof HTMLElement) {
        const object = scene.getObjectByProperty('uuid', outline_btn.dataset.uuid)
        add_outline_content(object)
    }
}

export function removeOutlinerObject(id: string) {
    const outline = document.querySelector(`.outline_btn[data-uuid="${id}"]`)
    if(outline instanceof HTMLElement) {
        outline.remove()
    }
}

export function refreshParams(uuid: string) {

    const params: HTMLElement = document.querySelector('.data')
    const object = scene.getObjectByProperty('uuid', uuid)
    const data = object.userData.data
    
    params.innerHTML =
        `
            <input type="color" class="color" value="#${data.edit.color}">
            <input type="range" class="range" value="${data.edit.scale}" min="0.1" max="10" step="0.1">
        `

    params.querySelector(".color")
        .addEventListener('input', function () {
            const hexcode = '0x'+this.value.split('#')[1]
            if(object instanceof THREE.Mesh) {

                object.material.color.setHex(hexcode)

            } else if(object.children[0] instanceof THREE.Mesh) {

                object.children[0].material.color.setHex(hexcode)
                object.userData.data.edit.color = this.value.split('#')[1]
            
            }
        })

    params.querySelector('.range')
        .addEventListener('input', function () {

            object.scale.set(this.value, this.value, this.value)

            object.userData.data.edit.scale = this.value
        
        })
}
