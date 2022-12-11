import * as fb from '../../services/fb'

export class nav_bar_register{
    state = {
        user: null,
    }
    constructor() {
        this.render()
        console.log(fb.user_information.get())

        fb.user_information.addCallback(this.login())
    }

    login (): Function {
        return () => {
            this.render()
            console.log(fb.user_information.get())
        }
    }

    render () {
        const login = document.querySelector('.register') as HTMLButtonElement
        const information = fb.user_information.get()

        console.log(information)

        if ( !('email' in information) ) {
            const html = `
                <button id="login">login</button>
            `
            login.innerHTML = html
    
            login.querySelector('#login')?.addEventListener('click', () => {
                fb.loginWithPopup()
            })
    
            return html
        }


        const html = `
            <h1>${information.email}</h1>
            <button id="logout">logout</button>
        `

        login.innerHTML = html

        login.querySelector('#logout')?.addEventListener('click', () => {
            fb.logout()
        })

        return html
    }
}

new nav_bar_register()