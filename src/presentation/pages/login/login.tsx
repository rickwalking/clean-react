import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
    LoginHeader,
    Footer,
    Input,
    FormStatus
} from '@/presentation/components';

import Styles from './login-styles.scss';

import Context from '@/presentation/components/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';

import { Authentication } from '@/domain/usecases';

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
    authentication: Authentication;
};

const Login: React.FC<Props> = ({
    validation,
    authentication
}: Props): JSX.Element => {
    const history = useHistory();
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        try {
            if (state.isLoading || (
                state.emailError !== undefined &&
                state.emailError.length > 0
            ) || (
                state.passwordError !== undefined &&
                state.passwordError.length > 0
            )) {
                return;
            }

            setState({
                ...state,
                isLoading: true
            });

            const account = await authentication.auth({
                email: state.email,
                password: state.password
            });

            if (account === undefined) {
                return;
            }

            localStorage.setItem('accessToken', account?.accessToken);
            history.replace('/');
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            });
        }
    };

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={ { ...state, setState } }>
                <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <Input type='email' name='email' placeholder='Digite seu email' />
                    <Input type='password' name='password' placeholder='Senha' />
                    <button data-testid='submit' disabled={canDisableButton()} className={Styles.submit} type='submit'>Entrar</button>
                    <Link to='/signup' data-testid='signup' className={Styles.link}>Criar conta</Link>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    );
};

export default Login;
