export class observable {
    #entry: any
    #callbacks: Function[] = []
    
    constructor (entry: any) {
        this.#entry = entry
    }

    get () {
        return this.#entry
    }

    set (newValue: any) {
        if (typeof this.#entry !== typeof newValue) console.error('not seem type value')

        this.#entry = newValue

        this.#callbacks.forEach(callback => {
            callback()
        })

        return this.#entry
    }

    addCallback (callback: Function | Function[]) {
        if(Array.isArray(callback)) {
            callback.forEach(cb => {
                this.#callbacks.push(cb)
            })
            return
        } else {
            this.#callbacks.push(callback)
            return
        }
    }

    push (newValue: any) {
        if (!Array.isArray(this.#entry)) console.error('not seem type value')

        this.#entry.push(newValue)

        this.#callbacks.forEach(callback => {
            callback()
        })

        return this.#entry
    }

}


//
// HOW TO USE
//      import this file
//      create new observable
// const ob = new observable("a")
//      create ur function for callback
// const myFunction = () => {
//     console.log('hello')
// }
//      add your function to callback
// ob.addCallback(myFunction)
//      when i switch value, it will call myFunction
// ob.setValue("b")