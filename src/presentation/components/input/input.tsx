/* eslint-disable @typescript-eslint/restrict-template-expressions */
// @ts-nocheck

import React, { useContext } from 'react';

import Styles from './input-styles.scss';

import Context from '@/presentation/components/context/form/form-context';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props): JSX.Element => {
    const value = useContext(Context);
    const error: any = value[`${props.name}Error`];

    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false;
    };

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        value.setState({
            ...value,
            [event.target.name]: event.target.value
        });
    };

    const getStatus = (): string => {
        return '🔴';
    };

    const getTitle = (): any => {
        return error;
    };

    return (
        <div className={Styles.inputWrap}>
            <input data-testid={props.name} { ...props } readOnly onFocus={enableInput} onChange={handleChange} />
            <span data-testid={`${props.name}Status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
        </div>
    );
};

export default Input;
