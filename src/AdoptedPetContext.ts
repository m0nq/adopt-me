import { createContext } from 'react';
import { Pet } from './APIResponse.type';

const AdoptedPetContext = createContext<[Pet, () => void]>([
	{
		id: 0,
		name: '',
		animal: '',
		description: '',
		breed: '',
		images: [],
		city: '',
		state: ''
	},
	() => {}
]);

export default AdoptedPetContext;
