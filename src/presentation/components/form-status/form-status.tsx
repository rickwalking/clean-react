import React, { useContext } from 'react';

import { Spinner } from '@/presentation/components';

import Styles from './form-status.scss';

import Context from '@/presentation/components/context/form/form-context';

const FormStatus: React.FC = (): JSX.Element => {
    const { isLoading, errorMessage } = useContext(Context);

    return (
        <div data-testid='error-wrap' className={Styles.errorWrap}>
            {isLoading ? (
                <Spinner className={Styles.spinner} />
            ) : null}
            {errorMessage.length > 0 ? (
                <span className={Styles.error}>
                    {errorMessage}
                </span>) : null
            }
        </div>
    );
};

export default FormStatus;
