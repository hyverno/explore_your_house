import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {scene} from "./scene";
import {addOutlinerObject} from "./outliner";
import {generateUUID} from "three/src/math/MathUtils";

const loader = new GLTFLoader();

function EDITOR_import(path) {

    loader.load( path, function ( gltf ) {
        const object = gltf.scene
        object.castShadow = true
        object.receiveShadow = true
        let index: number = 0
        let meshAspect = undefined
        object.children.forEach((e) => {
            e.castShadow = true
            e.receiveShadow = true
            if(index >= 0 && e instanceof THREE.Mesh) {
                meshAspect=e
                index=-1
            }
            index++
        })
        scene.add( object )
        object.userData =
            {
                componentTags: "move",
                data: {
                    color: meshAspect.material.color.getHexString(),
                    scale: 1,
                    
                    edit: {
                        color: meshAspect.material.color.getHexString(),
                        scale: 1,
                    }
                }
            }
        addOutlinerObject({name: 'object 3d', id: object.uuid})

    }, undefined, function ( error ) {

        console.error( error );

    } );

}

export {EDITOR_import}