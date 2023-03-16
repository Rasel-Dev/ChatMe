import { Dispatch, SetStateAction, createContext, useReducer } from 'react';
import appReducer from './reducer';
import { AppActionType } from './types';

export const initialAppState = {
	isLoggedIn: false,
	id: 0,
	fullname: '',
	username: '',
	token: '',
};

export const AppStateContext = createContext({
	state: {} as Partial<typeof initialAppState>,
	dispatch: {} as Dispatch<AppActionType>,
});

type AppProviderType = {
	children: React.ReactNode;
};

const AppStateProvider: React.FC<AppProviderType> = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialAppState);

	return (
		<AppStateContext.Provider value={{ state, dispatch }}>
			{children}
		</AppStateContext.Provider>
	);
};

export default AppStateProvider;
