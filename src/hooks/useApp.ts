import { useContext } from 'react';
import { AppStateContext } from '../state/app/AppStateProvider';

export default function useApp() {
	const context = useContext(AppStateContext);
	if (!context)
		throw new Error('useApp must be used within a AppStateProvider');
	return context;
}
