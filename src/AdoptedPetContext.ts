import { createContext } from 'react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

import { Pet } from './APIResponse.type';
import { Animal } from './APIResponse.type';

const AdoptedPetContext = createContext<[Pet, Dispatch<SetStateAction<Pet>>]>([
	{
		id: 0,
		name: '',
		animal: '' as Animal,
		description: '',
		breed: '',
		images: [],
		city: '',
		state: ''
	},
	() => {}
]);

export default AdoptedPetContext;
