import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Pet } from './APIResponse.type';
import { PetAPIResponse } from './APIResponse.type';
import { BreedListAPIResponse } from './APIResponse.type';

export const petApi = createApi({
	reducerPath: 'petApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://pets-v2.dev-apis.com' }),
	endpoints: builder => ({
		getPet: builder.query<Pet, string>({
			query: id => ({ url: 'pets', params: { id } }),
			transformResponse: (response: PetAPIResponse) => response.pets[0]
		}),
		getBreeds: builder.query({
			query: animal => ({ url: 'breeds', params: { animal } }),
			transformResponse: (response: BreedListAPIResponse) => response.breeds
		}),
		search: builder.query({
			query: ({ animal, location, breed }) => ({
				url: 'pets',
				params: { animal, location, breed }
			}),
			transformResponse: (response: PetAPIResponse) => response.pets
		})
	})
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
