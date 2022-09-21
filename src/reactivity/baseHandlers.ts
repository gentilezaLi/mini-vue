const get = createGetter()
const set = createSetter()

function createGetter(isReadonly = false, shallow = false) {

}

function createSetter() {

}

export const mutableHandlers = {
    get,
    set,
}
