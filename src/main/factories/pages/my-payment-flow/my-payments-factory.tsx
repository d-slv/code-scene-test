import React from 'react';

import {MyPayments} from 'presentation/pages/my-payments-flow';
import {makeGetObligationPdf} from 'main/factories/usecases';

export const MakeMyPayments: React.FC = () => <MyPayments pdf={makeGetObligationPdf()} />;
