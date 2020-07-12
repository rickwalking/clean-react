import React from 'react';

import { render } from '@testing-library/react';

import Login from '@/presentation/pages/login/login';

describe('Login component', () => {
    test('Should not render spinner and error on start', (): void => {
        const { getByTestId } = render(<Login />);
        const errorWrap = getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);
    });
});
