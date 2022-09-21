import { track, trigger } from './effect'
import { mutableHandlers } from './baseHandlers'
export const reactiveMap = new WeakMap()

export function reactive(target) {
    return createReactiveObject(target, reactiveMap, mutableHandlers)
}