import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import Context from '@/presentation/components/context/form/form-context';

import Input from '@/presentation/components/input/input';

const makeSut = (): RenderResult => {
    return render(
        <Context.Provider value={{
            isLoading: false,
            mainError: 'null',
            setState: (...args: any[]) => null
        }}>
            <Input name='field' />
        </Context.Provider>
    );
};

describe('Input Component', (): void => {
    test('should begin with readOnly', (): void => {
        const sut = makeSut();
        const input = sut.getByTestId('field') as HTMLInputElement;
        expect(input.readOnly).toBe(true);
    });
});
