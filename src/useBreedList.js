import { useEffect } from 'react';
import { useState } from 'react';

const localCache = {};

const useBreedList = animal => {
  const [breeds, setBreeds] = useState([]);
  const [status, setStatus] = useState('unloaded');

  useEffect(() => {
    (async () => {
      const requestBreeds = async () => {
        setBreeds([]);
        setStatus('loading');

        const { breeds } = await (await fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`)).json();
        localCache[animal] = breeds || [];
        setBreeds(localCache[animal]);
        setStatus('loaded');
      };

      if (!animal) {
        setBreeds([]);
      } else if (localCache[animal]) {
        setBreeds(localCache[animal]);
      } else {
        await requestBreeds();
      }
    })();
  }, [animal]);

  return [breeds, status];
};

export default useBreedList;
