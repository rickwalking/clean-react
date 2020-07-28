import React from 'react';

import { render, RenderResult, fireEvent } from '@testing-library/react';

import Context from '@/presentation/components/context/form/form-context';

import Input from '@/presentation/components/input/input';

import faker from 'faker';

const makeSut = (fieldName: string): RenderResult => {
    return render(
        <Context.Provider value={{
            isLoading: false,
            mainError: 'null',
            setState: (...args: any[]) => null
        }}>
            <Input name={fieldName} />
        </Context.Provider>
    );
};

describe('Input Component', (): void => {
    test('should begin with readOnly', (): void => {
        const fieldName: string = faker.database.column();
        const sut = makeSut(fieldName);
        const input = sut.getByTestId(fieldName) as HTMLInputElement;
        expect(input.readOnly).toBe(true);
    });
});

describe('Input Component', (): void => {
    test('should remove readOnly on focus', (): void => {
        const fieldName: string = faker.database.column();
        const sut = makeSut(fieldName);
        const input = sut.getByTestId(fieldName) as HTMLInputElement;
        fireEvent.focus(input);
        expect(input.readOnly).toBe(false);
    });
});
