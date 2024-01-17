import { useEffect } from 'react';
import { useState } from 'react';
import Pet from './Pet';
import useBreedList from './useBreedList';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [pets, setPets] = useState([]);
  const [breeds, status] = useBreedList(animal);

  useEffect(() => {
    (async () => {
      await requestPets();
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const requestPets = async () => {
    const { pets } = await (await fetch(`https://pets-v2.dev-apis.com/pets?location=${location}&animal=${animal}&breed=${breed}`)).json();
    setPets(pets);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-params">
      <form onSubmit={async e => {
        e.preventDefault();
        await requestPets();
      }}>
        <label htmlFor="location">
          Location
          <input type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}/>
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal"
            value={animal}
            onChange={e => {
              setAnimal(e.target.value);
              setBreed('');
            }}>
            <option/>
            {ANIMALS.map(animal => <option key={animal} value={animal}>{animal}</option>)}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed"
            disabled={!breeds.length}
            value={breed}
            onChange={e => setBreed(e.target.value)}>
            <option/>
            {breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      {pets.length && pets.map(pet => {
        return <Pet key={pet.id} name={pet.name} animal={pet.animal} breed={pet.breed}/>;
      })}
    </div>
  );
};

export default SearchParams;
