import React from 'react';
import {SignInPage} from 'presentation/pages/entry-flow';
import {makeRemoteAuthentication} from 'main/factories/usecases';

export const MakeLogin: React.FC = () => <SignInPage signIn={makeRemoteAuthentication()} />;
