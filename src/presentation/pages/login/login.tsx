import React from 'react';

import {
    LoginHeader,
    Footer,
    Input,
    FormStatus
} from '@/presentation/components';

import Styles from './login-styles.scss';

const Login: React.FC = (): JSX.Element => {
    return (
        <div className={Styles.login}>
            <LoginHeader />
            <form className={Styles.form}>
                <h2>Login</h2>
                <Input type='email' name='email' placeholder='Digite seu email' />
                <Input type='password' name='password' placeholder='Senha' />
                <button className={Styles.submit} type='submit'>Entrar</button>
                <span className={Styles.link}>Criar conta</span>
                <FormStatus />
            </form>
            <Footer />
        </div>
    );
};

export default Login;
