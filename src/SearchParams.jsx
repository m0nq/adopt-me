import { useState } from 'react';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState('');
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const breeds = ['Poodle'];

  return (
    <div className="search-params">
      <form action="">
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
    </div>
  );
};

export default SearchParams;
