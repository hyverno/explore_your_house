// Panel Button
import { HUD_geometry, HUD_import } from "../interface";
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