import React from 'react';

import { Spinner } from '@/presentation/components';

import Styles from './form-status.scss';

const FormStatus: React.FC = (): JSX.Element => {
    return (
        <div className={Styles.errorWrap}>
            <Spinner className={Styles.spinner} />
            <span className={Styles.error}>Error</span>
        </div>
    );
};

export default FormStatus;
