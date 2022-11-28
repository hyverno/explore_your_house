import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {scene} from "./scene";
import {addOutlinerObject} from "./outliner";
const loader = new GLTFLoader();

function EDITOR_import(path: string) {

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
                    // @ts-ignore
                    color: meshAspect.material.color.getHexString(),
                    scale: 1,
                    
                    edit: {
                        // @ts-ignore
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