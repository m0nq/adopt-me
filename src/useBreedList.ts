import { Animal } from './APIResponse.type';
import { useGetBreedsQuery } from './petApiService';

const useBreedList = (animal: Animal): [string[], string] => {
	const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
		skip: !animal
	});

	if (!animal) {
		return [[], 'loaded'];
	}

	return [breeds ?? [], isLoading ? 'loading' : 'loaded'] as [string[], string];
};

export default useBreedList;
