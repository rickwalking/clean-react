import React, { useState } from 'react';

import {
    LoginHeader,
    Footer,
    Input,
    FormStatus
} from '@/presentation/components';

import Styles from './login-styles.scss';

import Context from '@/presentation/components/context/form/form-context';

type StateProps = {
    isLoading: boolean;
    main?: string;
    emailError?: string;
    passwordError?: string;
};

const Login: React.FC = (): JSX.Element => {
    const [state] = useState<StateProps>({
        isLoading: false
    });

    const [errorState] = useState({
        emailError: 'Campo obrigatório',
        passwordError: 'Campo obrigatório',
        main: ''
    });

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={ { ...state, ...errorState } }>
                <form className={Styles.form}>
                    <h2>Login</h2>
                    <Input type='email' name='email' placeholder='Digite seu email' />
                    <Input type='password' name='password' placeholder='Senha' />
                    <button data-testid='submit' disabled={true} className={Styles.submit} type='submit'>Entrar</button>
                    <span className={Styles.link}>Criar conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    );
};

export default Login;
