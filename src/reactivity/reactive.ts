
import { mutableHandlers } from './baseHandlers'
export const reactiveMap = new WeakMap()

export function reactive(target) {
    return createReactiveObject(target, reactiveMap, mutableHandlers)
}

function createReactiveObject(target, proxyMap, baseHandlers) {
    //核心就是proxy
    //目的是可以监听到用户的get或者set的动作


    const proxy = new Proxy(target, baseHandlers)
    //把创建好的proxy给存起来
    proxyMap.set(target, proxy)
    return proxy
}