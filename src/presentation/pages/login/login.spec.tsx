import React from 'react';

import {
    render,
    RenderResult,
    fireEvent,
    cleanup
} from '@testing-library/react';

import Login from '@/presentation/pages/login/login';

import {
    ValidationStub,
    AuthenticationSpy
} from '@/presentation/test';

import faker from 'faker';

type SutTypes = {
    sut: RenderResult;
    authenticationSpy: AuthenticationSpy;
};

type SutParams = {
    validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    const authenticationSpy = new AuthenticationSpy();
    validationStub.errorMessage = params?.validationError;
    const sut = render(
        <Login
            validation={validationStub}
            authentication={authenticationSpy}
        />
    );

    return {
        sut,
        authenticationSpy
    };
};

const simulateValidSubmit = (
    sut: RenderResult,
    email: string = faker.internet.email(),
    password: string = faker.internet.password()
): void => {
    populateEmailField(sut, email);
    populatePasswordField(sut, password);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);
};

const populateEmailField = (
    sut: RenderResult,
    email: string = faker.internet.email()
): void => {
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (
    sut: RenderResult,
    password: string = faker.internet.password()
): void => {
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });
};

const isValidation = (validation: string | undefined): boolean => {
    return validation !== undefined && validation.length > 0;
};

const simulateStatusForField = (
    sut: RenderResult,
    fieldName: string,
    validationError?: string
): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}Status`);
    expect(fieldStatus.title).toBe(
        isValidation(validationError) ? validationError : 'Tudo certo!'
    );
    expect(fieldStatus.textContent).toBe(
        isValidation(validationError) ? '🔴' : '🔵'
    );
};

describe('Login component', (): void => {
    afterEach(cleanup);

    test('Should start with initial state', (): void => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const errorWrap = sut.getByTestId('error-wrap');
        expect(errorWrap.childElementCount).toBe(0);
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(true);
        simulateStatusForField(sut, 'email', validationError);
        simulateStatusForField(sut, 'password', validationError);
    });

    test('Should show email error if validation fails', (): void => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        populateEmailField(sut);
        simulateStatusForField(sut, 'email', validationError);
    });

    test('Should show password error if validation fails', (): void => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        populatePasswordField(sut);
        const passwordStatus = sut.getByTestId('passwordStatus');
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordStatus.textContent).toBe('🔴');
    });

    test('Should show valid password state if Validation succeeds', (): void => {
        const { sut } = makeSut();
        populatePasswordField(sut);
        simulateStatusForField(sut, 'password');
    });

    test('Should show valid email state if Validation succeeds', (): void => {
        const { sut } = makeSut();
        populateEmailField(sut);
        simulateStatusForField(sut, 'email');
    });

    test('Should enable submit button if form is valid', (): void => {
        const { sut } = makeSut();
        populateEmailField(sut);
        populatePasswordField(sut);
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
        expect(submitButton.disabled).toBe(false);
    });

    test('Should show spinner on submit', (): void => {
        const { sut } = makeSut();
        simulateValidSubmit(sut);
        const spinner = sut.getByTestId('spinner');
        expect(spinner).toBeTruthy();
    });

    test('Should call Authentication with correct values', (): void => {
        const { sut, authenticationSpy } = makeSut();
        const email = faker.internet.email();
        const password = faker.internet.password();
        simulateValidSubmit(sut, email, password);
        expect(authenticationSpy.params).toEqual({
            email,
            password
        });
    });

    test('Should call Authentication only once', (): void => {
        const { sut, authenticationSpy } = makeSut();
        simulateValidSubmit(sut);
        simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(1);
    });

    test('Should not call Authentication if form is invalid', (): void => {
        const validationError = faker.random.words();
        const { sut, authenticationSpy } = makeSut({ validationError });
        populateEmailField(sut);
        fireEvent.submit(sut.getByTestId('form'));
        expect(authenticationSpy.callsCount).toBe(0);
    });
});
