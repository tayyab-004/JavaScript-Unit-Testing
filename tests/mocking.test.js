import { vi, it, expect, describe, beforeEach } from 'vitest'
import { getPriceInCurrency, getShippingInfo, login, renderPage, signUp, submitOrder } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';
import security from '../src/libs/security';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');
vi.mock('../src/libs/email', async(importOriginal) => {
    const originalModule = await importOriginal();
    return{
        ...originalModule,
        sendEmail: vi.fn()
    }
});

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

describe('renderPage', () => {
    it('should return the correct content', async() => {
        const result = await renderPage();

        expect(result).toMatch(/content/i);
    })

    it('should call analytics', async() => {
        await renderPage();

        expect(trackPageView).toBeCalledWith('/home');
    })
})

describe('submitOrder', () => {
    const order = { totalAmount: 10 }
    const creditCard = { creditCardNumber: '4321' }

    it('should charge the customer', async() => {
        vi.mocked(charge).mockResolvedValue( {status: 'success'} )

        await submitOrder( order, creditCard )

        expect(charge).toHaveBeenCalled(creditCard, order.totalAmount)
    })

    it('should return the success when payment is successful', async() => {
        vi.mocked(charge).mockResolvedValue( {status: 'success'} );

        const result = await submitOrder(order, creditCard)

        expect(result).toEqual({ success: true });
    })

    it('should return the failed when payment is not successful', async() => {
        vi.mocked(charge).mockResolvedValue( {status: 'failed'} );

        const result = await submitOrder(order, creditCard)

        expect(result).toEqual({ success: false, error: 'payment_error' });
    })
})

describe('signUp', () => {
    const email = 'tayyabgee333@gmail.com';

    it('should return false if email is not valid', async() => {
        const result = await signUp('t');

        expect(result).toBe(false);
    })

    it('should return true if email is valid', async() => {
        const result = await signUp(email);

        expect(result).toBe(true);
    })

    it('should send the welcome email if email is valid', async() => {
        const result = await signUp(email);

        expect(sendEmail).toHaveBeenCalledOnce();
        const args = vi.mocked(sendEmail).mock.calls[0];
        expect(args[0]).toBe(email);
        expect(args[1]).toMatch(/welcome/i);
    })
})

describe('login', () => {
    const email = 'tayyabgee333@gmail.com';

    it('should email one-time login code', async() => {
        const spy = vi.spyOn(security, 'generateCode');

        await login(email);

        const securityCode = spy.mock.results[0].value.toString();
        expect(sendEmail).toHaveBeenCalledWith(email, securityCode)
    })
})