const fetchSearch = async ({ queryKey }) => {
	const { animal, location, breed } = queryKey[1];

	const res = await fetch(`https://pets-v2.dev-apis.com/pets?location=${location}&animal=${animal}&breed=${breed}`);
	console.log(res);

	if (!res.ok) {
		throw new Error(`Pet search not ok ${animal}, ${location}, ${breed}`);
	}

	return res.json();
};

export default fetchSearch;
