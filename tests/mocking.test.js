import { vi, it, expect, describe } from 'vitest'
import { getPriceInCurrency, getShippingInfo } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');


describe('Mock', () => {
    it('sendText ok', () => {
        // create a mock function 
        const sendText = vi.fn();
        sendText.mockReturnValue('ok')

        // calling mock function
        const result = sendText('message')

        // assertion for mock function is called
        expect(sendText).toHaveBeenCalledWith('message');

        // assertion for that result is 'ok'
        expect(result).toBe('ok');
    })
})

describe('getPriceInCurrency', () => {
    it('should return price in target currency', () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5)
        const price = getPriceInCurrency(10, 'PKR');

        expect(price).toBe(15);
    })
})

describe('getShippingInfo', () => {
    it('should return shipping unavailable when if quote cannot be fetched', () => {
        vi.mocked(getShippingQuote).mockReturnValue(null)
        const result = getShippingInfo("PAKISTAN");

        expect(result).toMatch(/unavailable/i);
    })

    it('should return shipping info if quote can be fetched', () => {
        vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 })
        const result = getShippingInfo("PAKISTAN");

        expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i)
    })
})