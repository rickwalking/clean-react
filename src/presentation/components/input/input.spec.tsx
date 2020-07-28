import React from 'react';

import { render } from '@testing-library/react';

import Context from '@/presentation/components/context/form/form-context';

import Input from '@/presentation/components/input/input';

describe('Input Component', (): void => {
    test('should begin with readOnly', (): void => {
        const { getByTestId } = render(
            <Context.Provider value={{
                isLoading: false,
                mainError: 'null',
                setState: (...args: any[]) => null
            }}>
                <Input name='field' />
            </Context.Provider>
        );
        const input = getByTestId('field') as HTMLInputElement;
        expect(input.readOnly).toBe(true);
    });
});
