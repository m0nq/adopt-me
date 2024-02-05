import { PetAPIResponse } from './APIResponse.type';

const fetchPet = async ({ queryKey }: { queryKey: ['details', string] }): Promise<PetAPIResponse> => {
	const id = queryKey[1];
	const apiRes = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);

	if (!apiRes.ok) {
		throw new Error(`details/${id} fetch not ok`);
	}

	return apiRes.json();
};

export default fetchPet;
