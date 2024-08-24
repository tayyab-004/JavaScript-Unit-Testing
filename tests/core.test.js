import { it, expect, describe } from 'vitest'

describe('test suite', () => {
    it('test case', () => {
        const result = { name: "Tayyab", id: 1 };
        expect(result).toMatchObject({ name: "Tayyab" });
        expect(result).toHaveProperty( "name" );
        expect(typeof result.name).toBe("string");
    })
})