import { Animal } from './APIResponse.type';
import { PetAPIResponse } from './APIResponse.type';

interface Query {
	queryKey: [string, { animal: Animal, location: string, breed: string }];
}

const fetchSearch = async ({ queryKey }: Query): Promise<PetAPIResponse> => {
	const { animal, location, breed } = queryKey[1];

	const res = await fetch(`https://pets-v2.dev-apis.com/pets?location=${location}&animal=${animal}&breed=${breed}`);

	if (!res.ok) {
		throw new Error(`Pet search not ok ${animal}, ${location}, ${breed}`);
	}

	return res.json();
};

export default fetchSearch;
