import React, { Context } from 'react';
import { IAppContext } from '../interfaces/AppContext';
export const AppContext: Context<IAppContext> = React.createContext<IAppContext>({});
