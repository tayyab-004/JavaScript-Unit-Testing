import { describe, it, expect } from "vitest";
import { max, fizzBuzz } from "../src/intro";

describe("max", () => {
    it("should return first argument as greater", ()=> {
        expect(max(90,20)).toBe(90)
    });

    it("should return second argument as greater", ()=> {
        expect(max(20,90)).toBe(90)
    });

    it("should return first argument as arguments are equal", ()=> {
        expect(max(90,90)).toBe(90)
    });
})

describe("fizzBuzz", () => {
    it("should return FizzBuzz if number is divisible by 3 & 5", ()=> {
        expect(fizzBuzz(15)).toBe("FizzBuzz")
    });

    it("should return Fizz if number is divisible by 3", ()=> {
        expect(fizzBuzz(9)).toBe("Fizz")
    });

    it("should return Buzz if number is divisible by 5", ()=> {
        expect(fizzBuzz(10)).toBe("Buzz")
    });

    it("should return argument if it is not divisible by 3 or 5", ()=> {
        expect(fizzBuzz(1)).toBe("1")
    });
})