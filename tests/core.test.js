import { it, expect, describe } from 'vitest'
import { getCoupons } from '../src/core';

describe('getCoupons', () => {
    it('should return an array of coupons', () => {
        const coupons = getCoupons();
        expect(Array.isArray(coupons)).toBe(true);
        expect(coupons.length).toBeGreaterThan(0);
    })
    it('should return an array with valid coupon codes', () => {
        const coupon =getCoupons();
        coupon.forEach(coupon => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon.code).toBeTruthy();
        });
    })
})