import React from 'react';

import {
    render,
    RenderResult,
    fireEvent,
    cleanup
} from '@testing-library/react';

import Login from '@/presentation/pages/login/login';

import { ValidationStub } from '@/presentation/test';

import faker from 'faker';

type SutTypes = {
    sut: RenderResult;
};

type SutParams = {
    validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;
    const sut = render(<Login validation={validationStub} />);

    return {
        sut
    };
};

describe('Login component', () => {
    afterEach(cleanup);

    test('Should start with initial state', (): void => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const errorWrap = sut.getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);
        const emailStatus = sut.getByTestId('emailStatus');
        expect(emailStatus.title).toBe(validationError);
        expect(emailStatus.textContent).toBe('🔴');
        const passwordStatus = sut.getByTestId('passwordStatus');
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordStatus.textContent).toBe('🔴');
    });

    test('Should show email error if validation fails', (): void => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const emailInput = sut.getByTestId('email');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const emailStatus = sut.getByTestId('emailStatus');
        expect(emailStatus.title).toBe(validationError);
        expect(emailStatus.textContent).toBe('🔴');
    });

    test('Should show password error if validation fails', (): void => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const passwordInput = sut.getByTestId('password');
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const passwordStatus = sut.getByTestId('passwordStatus');
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordStatus.textContent).toBe('🔴');
    });

    test('Should show valid password state if Validation succeeds', (): void => {
        const { sut } = makeSut();
        const passwordInput = sut.getByTestId('password');
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const passwordStatus = sut.getByTestId('passwordStatus');
        expect(passwordStatus.title).toBe('Tudo certo!');
        expect(passwordStatus.textContent).toBe('🔵');
    });

    test('Should show valid email state if Validation succeeds', (): void => {
        const { sut } = makeSut();
        const emailInput = sut.getByTestId('email');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const emailStatus = sut.getByTestId('emailStatus');
        expect(emailStatus.title).toBe('Tudo certo!');
        expect(emailStatus.textContent).toBe('🔵');
    });

    test('Should enable submit button if form is valid', (): void => {
        const { sut } = makeSut();
        const emailInput = sut.getByTestId('email');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const passwordInput = sut.getByTestId('password');
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(false);
    });

    test('Should show spinner on submit', (): void => {
        const { sut } = makeSut();
        const emailInput = sut.getByTestId('email');
        fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
        const passwordInput = sut.getByTestId('password');
        fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        fireEvent.click(submitButton);
        const spinner = sut.getByTestId('spinner');
        expect(spinner).toBeTruthy();
    });
});
