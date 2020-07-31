import React from 'react';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import {
    render,
    RenderResult,
    fireEvent,
    cleanup,
    waitFor
} from '@testing-library/react';

import { Login } from '@/presentation/pages';

import {
    ValidationStub,
    AuthenticationSpy,
    SaveAccessTokenMock
} from '@/presentation/test';

import faker from 'faker';
import { InvalidCredentialsError } from '@/domain/errors';

type SutTypes = {
    sut: RenderResult;
    authenticationSpy: AuthenticationSpy;
    saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
    validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });
const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    const authenticationSpy = new AuthenticationSpy();
    const saveAccessTokenMock = new SaveAccessTokenMock();
    validationStub.errorMessage = params?.validationError;
    const sut = render(
        <Router history={history}>
            <Login
                validation={validationStub}
                authentication={authenticationSpy}
                saveAccessToken={saveAccessTokenMock}
            />
        </Router>
    );

    return {
        sut,
        authenticationSpy,
        saveAccessTokenMock
    };
};

const simulateValidSubmit = async (
    sut: RenderResult,
    email: string = faker.internet.email(),
    password: string = faker.internet.password()
): Promise<void> => {
    populateEmailField(sut, email);
    populatePasswordField(sut, password);
    const form = sut.getByTestId('form');
    fireEvent.submit(form);
    await waitFor(() => form);
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

const testStatusForField = (
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

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(count);
};

const testElementExists = (sut: RenderResult, fieldName: string): void => {
    const element = sut.getByTestId(fieldName);
    expect(element).toBeTruthy();
};

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
    const element = sut.getByTestId(fieldName);
    expect(element.textContent).toBe(text);
};

const testButtonIsDisabled = (
    sut: RenderResult,
    fieldName: string,
    isDisabled: boolean
): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement;
    expect(button.disabled).toBe(isDisabled);
};

describe('Login component', (): void => {
    afterEach(cleanup);

    test('Should start with initial state', (): void => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        testErrorWrapChildCount(sut, 0);
        testButtonIsDisabled(sut, 'submit', true);
        testStatusForField(sut, 'email', validationError);
        testStatusForField(sut, 'password', validationError);
    });

    test('Should show email error if validation fails', (): void => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        populateEmailField(sut);
        testStatusForField(sut, 'email', validationError);
    });

    test('Should show password error if validation fails', (): void => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        populatePasswordField(sut);
        const passwordStatus = sut.getByTestId('passwordStatus');
        expect(passwordStatus.title).toBe(validationError);
        testElementText(sut, 'passwordStatus', '🔴');
    });

    test('Should show valid password state if Validation succeeds', (): void => {
        const { sut } = makeSut();
        populatePasswordField(sut);
        testStatusForField(sut, 'password');
    });

    test('Should show valid email state if Validation succeeds', (): void => {
        const { sut } = makeSut();
        populateEmailField(sut);
        testStatusForField(sut, 'email');
    });

    test('Should enable submit button if form is valid', (): void => {
        const { sut } = makeSut();
        populateEmailField(sut);
        populatePasswordField(sut);
        testButtonIsDisabled(sut, 'submit', false);
    });

    test('Should show spinner on submit', async (): Promise<void> => {
        const { sut } = makeSut();
        await simulateValidSubmit(sut);
        testElementExists(sut, 'spinner');
    });

    test('Should call Authentication with correct values', async (): Promise<void> => {
        const { sut, authenticationSpy } = makeSut();
        const email = faker.internet.email();
        const password = faker.internet.password();
        await simulateValidSubmit(sut, email, password);
        expect(authenticationSpy.params).toEqual({
            email,
            password
        });
    });

    test('Should call Authentication only once', async (): Promise<void> => {
        const { sut, authenticationSpy } = makeSut();
        await simulateValidSubmit(sut);
        await simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(1);
    });

    test('Should not call Authentication if form is invalid', async(): Promise<void> => {
        const validationError = faker.random.words();
        const { sut, authenticationSpy } = makeSut({ validationError });
        await simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(0);
    });

    test('Should present error if Authentication fails', async(): Promise<void> => {
        const { sut, authenticationSpy } = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(
            Promise.reject(error)
        );
        await simulateValidSubmit(sut);
        testElementText(sut, 'main-error', error.message);
        testErrorWrapChildCount(sut, 1);
    });

    test('Should call SaveAccessToken on success', async(): Promise<void> => {
        const {
            sut,
            authenticationSpy,
            saveAccessTokenMock
        } = makeSut();

        await simulateValidSubmit(sut);
        expect(saveAccessTokenMock.accessToken)
            .toBe(authenticationSpy.account.accessToken);
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe('/');
    });

    test('Should present error if SaveAccessToken fails', async(): Promise<void> => {
        const { sut, saveAccessTokenMock } = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(
            Promise.reject(error)
        );
        await simulateValidSubmit(sut);
        testElementText(sut, 'main-error', error.message);
        testErrorWrapChildCount(sut, 1);
    });

    test('Should go to sign up page', (): void => {
        const { sut } = makeSut();
        const register = sut.getByTestId('signup');
        fireEvent.click(register);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe('/signup');
    });
});
