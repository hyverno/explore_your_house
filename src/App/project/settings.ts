import Stats from 'three/examples/jsm/libs/stats.module'
const stats = Stats()
// document.body.appendChild(stats.dom)

export function updateState() {
    stats.update()
    requestAnimationFrame(updateState)
}

// updateState()
