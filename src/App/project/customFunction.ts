import * as THREE from 'three'
import { scene } from './scene'
import { createObject } from './createObject'
import { allOutlineContent } from './globalVariable'
import { removeOutlinerObject } from './outliner'

export let allObject: any[] = []

export function getAllObjectByUserData() {
    allObject=[]
    scene.traverse((e) => {
        if (e instanceof THREE.Mesh && e.userData.componentTags !== undefined || null) {
            allObject.push(e)
            return allObject
        }
    })
}

// create interface with for JSON file '../../static/test.json'

interface IJSON {
    "config": {
        "type": string,
        "position": {
            "x": number,
            "y": number,
            "z": number
        },
        "rotation": {
            "x": number,
            "y": number,
            "z": number
        }
    },
    "userData": {
        "componentTags": string,
        "data": {
            "color": number,
            "scale": number,
            "edit": {
                "color": number,
                "scale": number
            }
        }
    }
}


export function readJSONFileInput(input: HTMLInputElement) {
    let result: IJSON[] = []

    const file = input.files[0]
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")

    reader.onload = function() {
        let item: IJSON[] = JSON.parse(reader.result.toString())
        result = item

        allOutlineContent.forEach(element => {
            scene.remove(element)
            removeOutlinerObject(element.uuid)
        });

        result.map((element) => {
            console.log(element.config.type)
            new createObject(
                element.config.type,
                false,
                element.userData.data.color,
            )
        })
    }
}
