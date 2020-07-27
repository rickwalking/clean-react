import React from 'react';

import Login from '@/presentation/pages/login/login';

import {
    RemoteAuthentication
} from '@/data/usecases/authentication/remote-authentication';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { ValidationComposite } from '@/validation/validators';
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder';

export const makeLogin: React.FC = () => {
    const url = 'http://fordevs.herokuapp.com/api/login';
    const axiosHttpClient = new AxiosHttpClient();
    const removeAuthentication = new RemoteAuthentication(
        url,
        axiosHttpClient
    );

    const validationComposite = ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
    ]);

    return (
        <Login
            authentication={removeAuthentication}
            validation={validationComposite}
        />
    );
};
