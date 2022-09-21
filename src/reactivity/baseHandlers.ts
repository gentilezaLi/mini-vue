import { track, trigger } from './effect'

const get = createGetter()
const set = createSetter()

function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {

        const res = Reflect.get(target, key, receiver)
        if (!isReadonly) {
            //在触发get的时候进行依赖收集
            track(target, 'get', key)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver)

        //在触发set的时候进行触发依赖
        trigger(target, 'set', key)
        return result
    }
}

export const mutableHandlers = {
    get,
    set,
}
