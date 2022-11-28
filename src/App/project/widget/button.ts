// Panel Button
import { HUD_geometry, HUD_import } from "../interface";
import FileSaver from 'file-saver'
import {export_file} from "../globalVariable";
import {readJSONFileInput} from "../customFunction";
import * as fb from "../../services/fb";


const BTN_geometry = document.getElementsByClassName('geometry')
const BTN_import = document.getElementsByClassName('import')

Array.from(BTN_geometry).forEach(element => {
    element.addEventListener('click', () => {
        HUD_geometry()
    })
})

Array.from(BTN_import).forEach(element => {
    element.addEventListener('click', () => {
        HUD_import()
    })
})

const BTN_save_export = document.querySelector('#save_export') as HTMLButtonElement
BTN_save_export.addEventListener('click', function() {
    const blob = new Blob([JSON.stringify(export_file)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "test.json")
})

const BTN_save_import = document.querySelector('#save_import') as HTMLInputElement
BTN_save_import.addEventListener('change', function() {

    readJSONFileInput(BTN_save_import)

})

const BTN_login = document.querySelector('#login') as HTMLButtonElement
BTN_login.addEventListener('click', function() {
    fb.loginWithPopup()
})