import { configureStore } from '@reduxjs/toolkit';

import adoptedPet from './adoptedPetSlice';
import searchParams from './searchParamsSlice';
import { petApi } from './petApiService';

const store = configureStore({
	reducer: {
		adoptedPet,
		searchParams,
		[petApi.reducerPath]: petApi.reducer
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat(petApi.middleware);
	}
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
