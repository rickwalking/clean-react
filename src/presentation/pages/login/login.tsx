import React from 'react';

import Spinner from '@/presentation/components/spinner/spinner';
import LoginHeader from '@/presentation/components/login-header/login-header';
import Footer from '@/presentation/components/footer/footer';
import Input from '@/presentation/components/input/input';

import Styles from './login-styles.scss';

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <LoginHeader />
            <form className={Styles.form}>
                <h2>Login</h2>
                <Input type='email' name='email' placeholder='Digite seu email' />
                <Input type='password' name='password' placeholder='Senha' />
                <button className={Styles.submit} type='submit'>Entrar</button>
                <span className={Styles.link}>Criar conta</span>
                <div className={Styles.errorWrap}>
                    <Spinner className={Styles.spinner} />
                    <span className={Styles.error}>Error</span>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Login;
