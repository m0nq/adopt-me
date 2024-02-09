import { createSlice } from '@reduxjs/toolkit';

import type { Pet } from './APIResponse.type';

interface PetState {
	value: Pet;
}

const initialState: PetState = {
	value: {
		id: 0,
		name: '',
		animal: '',
		description: '',
		breed: '',
		images: [],
		city: '',
		state: ''
	}
};

const adoptedPetSlice = createSlice({
	name: 'adoptedPet',
	initialState,
	reducers: {
		adopt: (state, action) => {
			state.value = action.payload;
		}
	}
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
