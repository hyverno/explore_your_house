// import
import { export_file } from '../../project/globalVariable'
import { readJSONFileInput } from '../../project/customFunction'
import * as FileSaver from 'file-saver'

export class navBar {
    constructor() {
        this.render()
    }

    render() {
        const html = `
            <p id="save">File</p>
            <div class="extra">
                <button id="save_export">export in local</button>
                <button id="save_cloud">export in cloud</button>
                <input type="file" id="save_import">
            </div>
        `

        const elementFile = document.querySelector('.file') as HTMLDivElement
        elementFile.innerHTML = html
        
        const BTN_save_export = document.querySelector('#save_export') as HTMLButtonElement
        BTN_save_export.addEventListener('click', function() {
            const blob = new Blob([JSON.stringify(export_file)], {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(blob, "test.json")
        })
        
        const BTN_save_import = document.querySelector('#save_import') as HTMLInputElement
        BTN_save_import.addEventListener('change', function() {
            readJSONFileInput(BTN_save_import)
        })


        const save_cloud = document.querySelector('#save_cloud') as HTMLButtonElement
        save_cloud.addEventListener('click', function() {
            // fb.save_cloud(export_file)
        })

        
    }
}
new navBar()
