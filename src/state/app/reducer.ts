import { initialAppState } from './AppStateProvider';
import { AppActionType } from './types';

export default function appReducer(
	state: typeof initialAppState,
	action: AppActionType
): typeof initialAppState {
	const { type, payload } = action;
	switch (type) {
		case 'AUTH':
			return { ...state, ...payload, isLoggedIn: true };
		default:
			return state;
	}
}
