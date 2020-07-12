import React, { useContext } from 'react';

import { Spinner } from '@/presentation/components';

import Styles from './form-status.scss';

import Context from '@/presentation/components/context/form/form-context';

const FormStatus: React.FC = (): JSX.Element => {
    const { isLoading, main } = useContext(Context);

    return (
        <div data-testid='error-wrap' className={Styles.errorWrap}>
            {isLoading ? (
                <Spinner className={Styles.spinner} />
            ) : null}
            {main.length > 0 ? (
                <span className={Styles.error}>
                    {main}
                </span>) : null
            }
        </div>
    );
};

export default FormStatus;
