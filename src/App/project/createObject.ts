import * as THREE from 'three'
import {scene} from "./scene";
import {addOutlinerObject} from "./outliner";

export const listObject = {
    cube: "cube",
    sphere: "sphere",
    plane: "PlaneGeometry",
    monkey: "monkey",
}

export let id: number = 0

function addShadow(element: THREE.Object3D) {
    element.castShadow = true
    element.receiveShadow = true
}

//const infos = {name: String,id: String,parent: String,}


export class createObject {
    constructor(mesh: any, twoSide: boolean, colorValue: number) {
        const meshObject = this.createMesh(mesh, twoSide) as THREE.Mesh <any, THREE.MeshLambertMaterial>
        meshObject.material.color.setHex(colorValue)
        this.globalSettings(meshObject, 'cube')
        id ++
    }

    // @ts-ignore
    globalSettings(mesh: THREE.Mesh, name: string) {
        addShadow(mesh)
        scene.add(mesh)
        mesh.userData =
            {
                componentTags: "move",
                data: {
                    color: (mesh.material as THREE.MeshLambertMaterial).color.getHexString(),
                    scale: 1,

                    edit: {
                        color: (mesh.material as THREE.MeshLambertMaterial).color.getHexString(),
                        scale: 1,
                    }
                }
            }
        addOutlinerObject({name: name, id: mesh.uuid})
    }

    setMaterial(twoSide: boolean): THREE.MeshLambertMaterial {
        return new THREE.MeshLambertMaterial({side: twoSide ? THREE.DoubleSide : THREE.FrontSide})
    }

    createMesh(mesh: any, twoSide: boolean): THREE.Mesh {
        if (mesh === listObject.cube) {
            const cube_geo = new THREE.BoxGeometry(1, 1)
            return new THREE.Mesh(cube_geo, this.setMaterial(twoSide))
        } else if (mesh === listObject.sphere) {
            const sphere_geo = new THREE.SphereGeometry(1, 10, 10)
            return new THREE.Mesh(sphere_geo, this.setMaterial(twoSide))
        } else if (mesh === listObject.plane) {
            const plane_geo = new THREE.PlaneGeometry(1, 1)
            return new THREE.Mesh(plane_geo, this.setMaterial(twoSide))
        } else {
            throw new Error(`Unknown mesh type: ${mesh}`)
        }
    }
}
