import { createContext } from 'react';

type FormContextType = {
    isLoading: boolean;
    mainError: string;
    emailError?: string;
    passwordError?: string;
    setState: (...args: any[]) => void;
};

export default createContext<FormContextType>({
    isLoading: false,
    mainError: '',
    emailError: '',
    passwordError: '',
    setState: (...args: any[]) => null
});
