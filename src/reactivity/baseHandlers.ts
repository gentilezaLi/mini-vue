const get = createGetter()
const set = createSetter()

function createGetter(isReadonly = false, shallow = false) {
    return function get(target,key,recriver){
        
    }
}

function createSetter() {

}

export const mutableHandlers = {
    get,
    set,
}
