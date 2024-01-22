import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Carousel from './Carousel';

import fetchPet from './fetchPet';

const Details = () => {
  const { id } = useParams();
  const results = useQuery({ queryKey: ['details', id], queryFn: fetchPet });

  if (results.isLoading || results.isPending) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (results.isError) {
    return <div className="loading-pane">There was an error. Please refresh and try again...</div>;
  }

  const pet = results?.data?.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images}/>
      <div>
        <h1>{pet.name}</h1>
        <h2>{pet.animal} - {pet.breed} - {pet.city}, {pet.state}</h2>
      </div>
    </div>
  );
};

export default Details;
