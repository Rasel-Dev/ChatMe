import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchFriendType, SearchGroupType } from '../../types/custom';
import { RootState } from '../store';

export interface SearchStateType {
	peoples: SearchFriendType[];
	groups: SearchGroupType[];
}

const initialState: SearchStateType = {
	peoples: [],
	groups: [],
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		initSearch(state, action: PayloadAction<SearchStateType>) {
			const { peoples, groups } = action.payload;
			state.peoples = peoples || [];
			state.groups = groups || [];
		},
	},
});

export const { initSearch } = searchSlice.actions;
export const selectSearch = (state: RootState) => state.search;
export default searchSlice.reducer;
