import { createContext } from 'react';

type FormContextType = {
    isLoading: boolean;
    errorMessage: string;
};

export default createContext<FormContextType>({
    isLoading: false,
    errorMessage: ''
});
