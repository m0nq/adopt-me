import { useTransition } from 'react';
import { useMemo } from 'react';
import { useDeferredValue } from 'react';
import { useState } from 'react';
import { FormEvent } from 'react';
import { ReactElement } from 'react';

import useBreedList from './useBreedList';
import { Animal } from './APIResponse.type.js';
import Results from './Results';
import { useAppSelector } from './hooks';
import { useAppDispatch } from './hooks';
import { all } from './searchParamsSlice';
import { useSearchQuery } from './petApiService';

const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = (): ReactElement => {
	const [animal, setAnimal] = useState('' as Animal);
	const [breeds] = useBreedList(animal);
	const [isPending, startTransition] = useTransition();
	const adoptedPet = useAppSelector(({ adoptedPet }) => adoptedPet.value);
	const requestParams = useAppSelector(({ searchParams }) => searchParams.value);
	const dispatch = useAppDispatch();

	const { data: pets = [] } = useSearchQuery(requestParams);
	const deferredPets = useDeferredValue(pets);
	const renderedPets = useMemo(() => <Results pets={deferredPets}/>, [deferredPets]);

	return (
		<div className="search-params">
			<form onSubmit={(e: FormEvent) => {
				e.preventDefault();
				const formData = new FormData(e.currentTarget as HTMLFormElement);
				const obj = {
					animal: formData.get('animal') as Animal ?? '',
					breed: formData.get('breed')?.toString() ?? '',
					location: formData.get('location')?.toString() ?? ''
				};
				startTransition(() => {
					dispatch(all(obj));
				});
			}}>
				{adoptedPet ? (
					<div className="pet image-container">
						<img src={adoptedPet?.images?.[0]} alt={adoptedPet?.name}/>
					</div>
				) : null}
				<label htmlFor="location">
					Location
					<input id="location" name="location" placeholder="Location"/>
				</label>
				<label htmlFor="animal">
					Animal
					<select id="animal"
						name="animal"
						onChange={(e) => setAnimal(e.target.value as Animal)}
						onBlur={(e) => setAnimal(e.target.value as Animal)}>
						<option/>
						{ANIMALS.map((animal) => (
							<option key={animal} value={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="breed">
					Breed
					<select disabled={!breeds.length} id="breed" name="breed">
						<option/>
						{breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
					</select>
				</label>
				{isPending ? (
					<div className="mini loading-pane">
						<h2 className="loader">🐶</h2>
					</div>
				) : (
					<button>Submit</button>
				)}
			</form>
			{renderedPets}
		</div>
	);
};

export default SearchParams;
