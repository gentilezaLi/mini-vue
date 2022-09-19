import { reactive } from '../reactive'
describe('reactive', () => {
    it('happy path', () => {
        const original = { foo: 1 }
        const observed = reactive(original)

        //original observed 是否相等
        expect(original).not.toBe(observed)
        expect(original.foo).toBe(1)
    })
})