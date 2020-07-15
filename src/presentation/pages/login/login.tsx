import React, { useState, useEffect } from 'react';

import {
    LoginHeader,
    Footer,
    Input,
    FormStatus
} from '@/presentation/components';

import Styles from './login-styles.scss';

import Context from '@/presentation/components/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';

type StateProps = {
    isLoading: boolean;
    email: string;
    password: string;
    mainError: string;
    emailError?: string;
    passwordError?: string;
};

type Props = {
    validation: Validation;
};

const Login: React.FC<Props> = ({ validation }: Props): JSX.Element => {
    const [state, setState] = useState<StateProps>({
        isLoading: false,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: ''
    });

    useEffect((): void => {
        setState({
            ...state,
            emailError: validation.validate('email', state.email),
            passwordError: validation.validate('password', state.password)
        });
    }, [state.email, state.password]);

    const canDisableButton = (): boolean => {
        if (state.passwordError === undefined ||
            state.emailError === undefined
        ) {
            return true;
        }

        return state.passwordError.length > 0 ||
            state.emailError.length > 0;
    };

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={ { ...state, setState } }>
                <form className={Styles.form}>
                    <h2>Login</h2>
                    <Input type='email' name='email' placeholder='Digite seu email' />
                    <Input type='password' name='password' placeholder='Senha' />
                    <button data-testid='submit' disabled={canDisableButton()} className={Styles.submit} type='submit'>Entrar</button>
                    <span className={Styles.link}>Criar conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    );
};

export default Login;
