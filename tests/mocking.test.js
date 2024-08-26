import { vi, it, expect, describe } from 'vitest'
import { getPriceInCurrency } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';

vi.mock('../src/libs/currency');

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