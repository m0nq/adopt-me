import { useQuery } from '@tanstack/react-query';

import fetchBreedList from './fetchBreedList';
import { Animal } from './APIResponse.type';

const useBreedList = (animal: Animal): [string[], string] => {
	const { data, status } = useQuery({ queryKey: ['breeds', animal], queryFn: fetchBreedList });

	return [data?.breeds ?? [], status] as [string[], string];
};

export default useBreedList;
