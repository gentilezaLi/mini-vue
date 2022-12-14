import { reactive } from '../reactive'
import { effect, stop } from '../effect'

describe('effect', () => {
    it('happy path', () => {
        const user = reactive({
            age: 10
        })
        let nextage
        effect(() => {
            nextage = user.age + 1
        })
        expect(nextage).toBe(11)

        //update
        user.age++
        expect(nextage).toBe(12)
    })

    // it('should return runner when call effect', () => {
    //     //1.effect(fn)=>function(runner)=>fn=>return
    //     let foo = 10
    //     const runner = effect(() => {
    //         foo++
    //         return 'foo'
    //     })
    //     expect(foo).toBe(11)
    //     const r = runner()
    //     expect(foo).toBe(12)
    //     expect(r).toBe('foo')

    // })

    //scheduler 调度
    // it('scheduler', () => {
    //     //1.通过effect 的第二个参数给定的一个scheduler的fn
    //     //2.effect第一次执行的时候还会执行fn
    //     //3.当响应式对象set update 不会执行fn 而是执行sechduler
    //     //4.如果说当执行runner 的时候，会再次执行fn
    //     let dummy
    //     let run: any
    //     const scheduler = jest.fn(() => {
    //         run = runner
    //     })
    //     const obj = reactive({ foo: 1 })
    //     const runner = effect(() => {
    //         dummy = obj.foo
    //     }, { scheduler })

    //     expect(scheduler).not.toHaveBeenCalled()
    //     expect(dummy).toBe(1)
    //     //should be called on first trigger
    //     obj.foo++
    //     expect(scheduler).toHaveBeenCalledTimes(1)
    //     //should not run yet
    //     expect(dummy).toBe(1)
    //     //manually tun
    //     run()
    //     expect(dummy).toBe(2)

    // })

    //stop
    // it('stop', () => {
    //     let dummy
    //     const obj = reactive({ prop: 1 })
    //     const runner = effect(() => {
    //         dummy = obj.prop
    //     })
    //     obj.prop = 2
    //     expect(dummy).toBe(2)
    //     stop(runner)
    //     obj.prop = 3
    //     expect(dummy).toBe(2)

    //     //stop effect shpould still be munually callable
    //     runner()
    //     expect(dummy).toBe(3)
    // })

    //onStop
    // it('onStop', () => {
    //     let dummy
    //     const obj = reactive({ foo: 1 })
    //     const onStop = jest.fn()
    //     const runner = effect(() => {
    //         dummy = obj.foo
    //     }, { onStop })
    //     stop(runner)
    //     expect(onStop).toBeCalledTimes(1)
    // })

    //新增  通过函数运行一次
    // it('should run the passed function once (wrapper by a effect)', () => {
    //     const fnSpy = jest.fn(() => { })
    //     effect(fnSpy)
    //     expect(fnSpy).toHaveBeenCalledTimes(1)
    // })

    //新增  观察基本特性
    // it('should observe basic properties',()=>{
    //     let dummy
    //     const counter=reactive({num:0})
    //     effect(()=>dummy=counter.num)
    //     expect(dummy).toBe(0)
    //     dummy.num=7
    //     expect(dummy).toBe(7)
    // })
})
