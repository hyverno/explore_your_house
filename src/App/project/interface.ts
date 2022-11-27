// Geometry Panel
import {listObject, createObject} from "./createObject";
import {EDITOR_import} from './ImportGLTF'
import {mouse} from './globalVariable'


let a = false
let b = false

let movableList: HTMLElement[] = []

function addMovable() {
    movableList = Array.from(document.querySelectorAll('.movable'))
    movableList.forEach(e => {
        e.addEventListener('mousemove', () => {
            console.log(mouse.x)
            e.style.transform = `translateX(${mouse.x}px)`
        })
    });
}

function HUD_geometry() {
    if (a) {
        const App = document.querySelectorAll('.HUD_');
        console.log(App)
        App.forEach(e => {e.remove()})
        a = false
    } else {
        const aa = document.querySelectorAll('.HUD_');
        aa.forEach(e => {e.remove()})
        a = true
        b = false
        const App = document.getElementById('App');
        App.insertAdjacentHTML('beforebegin',
            `
                <div class="HUD_">
                    <div class="movable">
                        <p>Geometry</p>
                    </div>
                    <div class="param">
                        <select class="value">
                            <option value="cube">
                                Cube
                            </option>
                            <option value="sphere">
                                Sphere
                            </option>
                            <option value="plane">
                                Plane
                            </option>
                        </select>

                        <div class="position">
                            <label id="color">select your color :</label>
                            <input type="color" class="aaa" value="#242424" id="color">
                        </div>

                        <div class="position">
                            <label for="side">Show double side ?</label>
                            <input id="side" type="checkbox">
                        </div>
                    </div>
                    <button class="add">
                        Add
                    </button>
                </div>
            `
        );
        const res = document.querySelector('.HUD_ .add')
        const option = document.querySelector('.HUD_ .value')
        const side = document.querySelector('.HUD_ #side')
        const color = document.querySelector('.HUD_ .aaa')
        res.addEventListener('click', () => {
            const optionValue = (option["options"][option["selectedIndex"]]).value
            const colorValue = color["value"].replace('#', '0x')
            // @ts-ignore
            new createObject(
                    listObject[optionValue],
                    side["checked"],
                    colorValue
                )
        })
    }
    addMovable()
}

function HUD_import() {
    if (b) {
        const App = document.querySelectorAll('.HUD_');
        App.forEach(e => {e.remove()})
        b = false
    } else {
        const aa = document.querySelectorAll('.HUD_');
        aa.forEach(e => {e.remove()})
        b = true
        a = false
        const App = document.getElementById('App');
        App.insertAdjacentHTML('beforebegin',
            `
                <div class="HUD_">
                    <div class="movable">
                        <p>Import</p>
                    </div>
                    <div class="param">
                        <input type="file" id="import">
                    </div>
                    <button class="add">
                        Add
                    </button>
                </div>
            `
        );
        const importElement = document.querySelector('.HUD_ #import')
        importElement.addEventListener('change', () => {
            console.log(importElement["files"][0])
            const url = URL.createObjectURL(importElement["files"][0])
            EDITOR_import(url)
        })
    }
    addMovable()
}

export {HUD_geometry, HUD_import}