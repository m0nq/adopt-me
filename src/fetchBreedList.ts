import { BreedListAPIResponse } from './APIResponse.type';
import { Animal } from './APIResponse.type';

const fetchBreedList = async ({ queryKey }: { queryKey: ['breeds', Animal] }): Promise<BreedListAPIResponse> => {
	const animal = queryKey[1];
	const apiRes = await fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`);

	if (!apiRes.ok) {
		throw new Error(`breeds/${animal} fetch not ok`);
	}

	return apiRes.json();
};

export default fetchBreedList;
