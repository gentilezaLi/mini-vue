import {
    mutableHandlers,
    readonlyHandlers,
    shallowReadonlyHandlers
} from './baseHandlers'

export const reactiveMap = new WeakMap()
export const readonlyMap = new WeakMap()
export const shallowReadonlyMap = new WeakMap()

export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive',
    IS_READONLY = '__v_isReadonly',
    RAW = '__v_raw'
}

export function reactive(target) {
    return createReactiveObject(target, reactiveMap, mutableHandlers)
}

export function readonly(target) {
    return createReactiveObject(target, readonlyMap, readonlyHandlers)
}

export function shallowReadonly(target) {
    return createReactiveObject(
        target,
        shallowReadonlyMap,
        shallowReadonlyHandlers
    )
}

export function isProxy(value) {
    return isReactive(value) || isReadonly(value)
}

export function isReactive(value) {
    //如果value是proxy的话
    //会触发get操作，而在createGetter里面会判断
    //如果value是普通对象的话
    //那么会返回undefined，那么就需要转化成布尔值
    return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
    return !!value[ReactiveFlags.IS_READONLY]
}

export function toRaw(value) {
    //如果value是proxy 的话，那么直接返回就可以了，因为会触发createGetter内的逻辑
    //如果value是普通对象的话，那么就应该返回普通对象
    //只要不是proxy 只要得到undefined的话，那么一定就是普通对象
    if (!value[ReactiveFlags.RAW]) {
        return value
    }
    return value[ReactiveFlags.RAW]
}

function createReactiveObject(target, proxyMap, baseHandlers) {
    //核心就是proxy
    //目的是可以监听到用户的get或者set的动作

    //如果命中缓存直接就好了 优化
    const existingProxy = proxyMap.get(target)
    if (existingProxy) {
        return existingProxy
    }

    const proxy = new Proxy(target, baseHandlers)
    //把创建好的proxy给存起来
    proxyMap.set(target, proxy)
    return proxy
}