// Geometry Panel
import {createObject} from "./createObject";
import {EDITOR_import} from './ImportGLTF'
import {mouse} from './globalVariable'


let a = false
let b = false

let movableList: HTMLElement[] = []

function addMovable() {
    movableList = Array.from(document.querySelectorAll('.movable'))
    movableList.forEach(e => {
        e.addEventListener('mousemove', () => {
            e.style.transform = `translateX(${mouse.x}px)`
        })
    });
}

function HUD_geometry() {
    if (a) {
        const App = document.querySelectorAll('.HUD_');
        App.forEach(e => {e.remove()})
        a = false
    } else {
        const aa = document.querySelectorAll('.HUD_');
        aa.forEach(e => {e.remove()})
        a = true
        b = false
        const App = document.getElementById('App') as HTMLElement;
        App?.insertAdjacentHTML('beforebegin',
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
                            <option value="PlaneGeometry">
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
        const res = document.querySelector('.HUD_ .add') as HTMLElement;
        const option = document.querySelector('.HUD_ .value') as HTMLSelectElement;
        const side = document.querySelector('.HUD_ #side') as HTMLInputElement;
        const color = document.querySelector('.HUD_ .aaa') as HTMLInputElement;
        
        res.addEventListener('click', () => {
            const optionValue: string = option.options[option.selectedIndex].value
            const colorValue: number = parseInt(color.value.replace('#', '')) // 0x

            // create object with option value
            new createObject(optionValue, side.checked, colorValue)
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
        const App = document.getElementById('App') as HTMLElement;
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
        const importElement = document.querySelector('.HUD_ #import') as HTMLInputElement;
        importElement.addEventListener('change', () => {
            // console.log(importElement?["files"]:[0])

            const result = importElement.files?.item(0) as File

            const blob = new Blob([result.toString()], {type: 'application/json'});

            const url = URL.createObjectURL(blob)
            EDITOR_import(url)
        })
    }
    addMovable()
}

export {HUD_geometry, HUD_import}