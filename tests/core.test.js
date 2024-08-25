import { it, expect, describe } from 'vitest'
import { calculateDiscount, canDrive, getCoupons, isPriceInRange, isValidUsername, validateUserInput } from '../src/core';

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

    it('should return an  array with valid discounts', ()=> {
        const coupon =getCoupons();
        coupon.forEach(coupon => {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.discount).toBeGreaterThan(0);
            expect(coupon.discount).toBeLessThan(1);
        });
    })
})

describe('calculateDiscount', () => {

    //positive test
    it('should return the discounted price if given valid code', () => {
        expect(calculateDiscount(10, 'SAVE10')).toBe(9);
        expect(calculateDiscount(10, 'SAVE20')).toBe(8);
    })

    //negative test
    it('should handle non-numeric price', () => {
        expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
    })

    it('should handle negative price', () => {
        expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
    })

    it('should handle non-string discount code', () => {
        expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
    })

    it('should handle invalid discount code', () => {
        expect(calculateDiscount(10, 'INVALID')).toBe(10);
    })
})

describe('validateUserInput', () => {
    it('should return success if given a valid input', () => {
        expect(validateUserInput('Tayyab', 22)).toMatch(/success/i);
    })

    it('should return error if username is not a string', () => {
        expect(validateUserInput(10, 22)).toMatch(/invalid/i);
    })

    it('should return error if username is less than 3 characters', () => {
        expect(validateUserInput("TG", 22)).toMatch(/invalid/i);
    })

    it('should return error if username is longer than 255 characters', () => {
        expect(validateUserInput("T".repeat(256), 22)).toMatch(/invalid/i);
    })

    it('should return error if age is not a number', () => {
        expect(validateUserInput('tayyab', '22')).toMatch(/invalid/i);
    })

    it('should return error if age is less than 18', () => {
        expect(validateUserInput('tayyab', 17)).toMatch(/invalid/i);
    })

    it('should return error if age is greater than 100', () => {
        expect(validateUserInput('tayyab', 101)).toMatch(/invalid/i);
    })

    it('should return error if both username and age are invalid', () => {
        expect(validateUserInput('', 102)).toMatch(/invalid/i);
    })
})

describe('isPriceInRange', () => {
    it('should return false when price is outside the range', () => {
        expect(isPriceInRange(-10, 0, 100)).toBe(false);
        expect(isPriceInRange(200, 0, 100)).toBe(false);
    })

    it('should return true when the price is equal to min or max', () => {
        expect(isPriceInRange(0, 0, 100)).toBe(true);
        expect(isPriceInRange(100, 0, 100)).toBe(true);
    })

    it('should return true when the price is within the range', () => {
        expect(isPriceInRange(99, 0, 100)).toBe(true);
    })
})

describe('isValidUsername', () => {
    const minLength = 5;
    const maxLength = 15;

    it('should return false if username is too short', () => {
        expect(isValidUsername('T'.repeat( minLength - 1 ))).toBe(false);
    })

    it('should return false if username is too long', () => {
        expect(isValidUsername('T'.repeat( maxLength + 1 ))).toBe(false);
    })

    it('should return true if username is at the min or max length', () => {
        expect(isValidUsername('T'.repeat( minLength ))).toBe(true);
        expect(isValidUsername('T'.repeat( maxLength ))).toBe(true);
    })

    it('should return true if username is within the length constraints', () => {
        expect(isValidUsername('T'.repeat( minLength + 1 ))).toBe(true);
        expect(isValidUsername('T'.repeat( maxLength - 1 ))).toBe(true);
    })

    it('should return false for invalid input types', () => {
        expect(isValidUsername(null)).toBe(false);
        expect(isValidUsername(undefined)).toBe(false);
        expect(isValidUsername(5)).toBe(false);
    })
})

describe('canDrive', () => {
    it('should return error for invalid country code', () => {
        expect(canDrive(5, 'PK')).toMatch(/invalid/i);
    })

    it.each([
        {age: 15, country: 'US', result: false},
        {age: 16, country: 'US', result: true},
        {age: 17, country: 'US', result: true},
        {age: 16, country: 'UK', result: false},
        {age: 17, country: 'UK', result: true},
        {age: 18, country: 'UK', result: true},
    ])('should return $result for $age, $country', ({age, country, result}) => {
    expect(canDrive(age, country)).toBe(result);
    })

    // it('should return false for underage in the US', () => {
    //     expect(canDrive(15, 'US')).toBe(false);
    // })

    // it('should return false for underage in the UK', () => {
    //     expect(canDrive(16, 'UK')).toBe(false);
    // })

    // it('should return true for driving eligibility in the US', () => {
    //     expect(canDrive(17, 'US')).toBe(true);
    // })

    // it('should return true for driving eligibility in the UK', () => {
    //     expect(canDrive(18, 'UK')).toBe(true);
    // })

    // it('should return true for min age in the US', () => {
    //     expect(canDrive(16, 'US')).toBe(true);
    // })

    // it('should return true for min age in the UK', () => {
    //     expect(canDrive(17, 'UK')).toBe(true);
    // })
})