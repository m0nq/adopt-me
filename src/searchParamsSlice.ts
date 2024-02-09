import { createSlice } from '@reduxjs/toolkit';

import { Animal } from './APIResponse.type';

interface SearchState {
	value: {
		location: string;
		breed: string;
		animal: Animal;
	};
}

const initialState: SearchState = {
	value: {
		location: '',
		animal: '',
		breed: ''
	}
};

const searchParamsSlice = createSlice({
	name: 'serachParams',
	initialState,
	reducers: {
		all: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
