import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useState } from 'react';

import AdoptedPetContext from './AdoptedPetContext';
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
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery({ queryKey: ['search', requestParams], queryFn: fetchSearch });
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={async e => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get('animal') ?? '',
            breed: formData.get('breed') ?? '',
            location: formData.get('location') ?? ''
          };
          setRequestParams(obj);
        }}>
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name}/>
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input className="search-input"
            type="text"
            id="location"
            name="location"
            placeholder="Location"/>
        </label>
        <label htmlFor="animal">
          Animal
          <select className="search-input"
            id="animal"
            name="animal"
            onChange={e => setAnimal(e.target.value)}>
            <option/>
            {ANIMALS.map(animal => <option key={animal} value={animal}>{animal}</option>)}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select className="search-input grayed-out-disabled"
            id="breed"
            name="breed"
            disabled={!breeds.length}>
            <option/>
            {breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
          </select>
        </label>
        <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500"
          type="submit">Submit
        </button>
      </form>
      <Results pets={pets}/>
    </div>
  );
};

export default SearchParams;
