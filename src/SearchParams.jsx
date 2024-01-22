import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import fetchSearch from './fetchSearch';
import Results from './Results';
import useBreedList from './useBreedList';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: ''
  });
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);

  const results = useQuery({ queryKey: ['search', requestParams], queryFn: fetchSearch });
  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form onSubmit={async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
          animal: formData.get('animal') ?? '',
          breed: formData.get('breed') ?? '',
          location: formData.get('location') ?? ''
        };
        setRequestParams(obj);
      }}>
        <label htmlFor="location">
          Location
          <input type="text"
            id="location"
            name="location"
            placeholder="Location"/>
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal"
            name="animal"
            onChange={e => setAnimal(e.target.value)}>
            <option/>
            {ANIMALS.map(animal => <option key={animal} value={animal}>{animal}</option>)}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed"
            name="breed"
            disabled={!breeds.length}>
            <option/>
            {breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <Results pets={pets}/>
    </div>
  );
};

export default SearchParams;
