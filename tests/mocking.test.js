import { vi, it, expect, describe } from 'vitest'

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