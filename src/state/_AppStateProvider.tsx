import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';

export interface AppStateInterface {
	username: string;
	friends: { username: string; isOnline: boolean }[];
}

const AppStateContext = createContext({
	state: {} as Partial<AppStateInterface>,
	setState: {} as Dispatch<SetStateAction<Partial<AppStateInterface>>>,
});

type AppStateProps = {
	children: ReactNode;
	value?: Partial<AppStateInterface>;
};

const AppStateProvider = ({
	children,
	value = {} as AppStateInterface,
}: AppStateProps) => {
	const [state, setState] = useState(value);
	return (
		<AppStateContext.Provider value={{ state, setState }}>
			{children}
		</AppStateContext.Provider>
	);
};

const useAppState = () => {
	const context = useContext(AppStateContext);
	if (!context)
		throw new Error('useGlobalState must be used within a GlobalStateContext');
	return context;
};

// export { AppStateProvider, useAppState };
