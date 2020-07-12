import React from 'react';

import { render } from '@testing-library/react';

import Login from '@/presentation/pages/login/login';

describe('Login component', () => {
    test('Should start with initial state', (): void => {
        const { getByTestId } = render(<Login />);
        const errorWrap = getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);
        const submitButton = getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);
        const emailStatus = getByTestId('emailStatus');
        expect(emailStatus.title).toBe('Campo obrigatório');
        expect(emailStatus.textContent).toBe('🔴');
        const passwordStatus = getByTestId('passwordStatus');
        expect(passwordStatus.title).toBe('Campo obrigatório');
        expect(passwordStatus.textContent).toBe('🔴');
    });
});
