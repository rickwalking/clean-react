import { createContext } from 'react';

type FormContextType = {
    isLoading: boolean;
    main: string;
    emailError: string;
    passwordError: string;
};

export default createContext<FormContextType>({
    isLoading: false,
    main: '',
    emailError: '',
    passwordError: ''
});
