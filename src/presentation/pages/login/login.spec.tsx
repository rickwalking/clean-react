import React from 'react';

import {
    render,
    RenderResult,
    fireEvent,
    cleanup
} from '@testing-library/react';

import Login from '@/presentation/pages/login/login';

import { ValidationSpy } from '@/presentation/test';

type SutTypes = {
    sut: RenderResult;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = render(<Login validation={validationSpy} />);

    return {
        sut,
        validationSpy
    };
};

describe('Login component', () => {
    afterEach(cleanup);

    test('Should start with initial state', (): void => {
        const { sut } = makeSut();
        const errorWrap = sut.getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);
        const emailStatus = sut.getByTestId('emailStatus');
        expect(emailStatus.title).toBe('Campo obrigatório');
        expect(emailStatus.textContent).toBe('🔴');
        const passwordStatus = sut.getByTestId('passwordStatus');
        expect(passwordStatus.title).toBe('Campo obrigatório');
        expect(passwordStatus.textContent).toBe('🔴');
    });

    test('Should call validation with correct email', (): void => {
        const { sut, validationSpy } = makeSut();
        const emailInput = sut.getByTestId('email');
        fireEvent.input(emailInput, { target: { value: 'any_email' } });
        expect(validationSpy.fieldName).toBe('email');
        expect(validationSpy.fieldValue).toBe('any_email');
    });

    test('Should call validation with correct password', (): void => {
        const { sut, validationSpy } = makeSut();
        const passwordInput = sut.getByTestId('password');
        fireEvent.input(passwordInput, { target: { value: 'any_password' } });
        expect(validationSpy.fieldName).toBe('password');
        expect(validationSpy.fieldValue).toBe('any_password');
    });
});
