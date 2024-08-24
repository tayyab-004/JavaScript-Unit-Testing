import { it, expect, describe } from 'vitest'

describe('test suite', () => {
    it('test case', () => {
        const result = { name: "Tayyab" };
        expect(result).toEqual({ name: "Tayyab" });
    })
})