import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AdoptedPetContext from './AdoptedPetContext';

import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import fetchPet from './fetchPet';
import Modal from './Modal';

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
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
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt</button>
        </h2>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button onClick={() => {
                  setAdoptedPet(pet);
                  navigate('/');
                }}>
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

const DetailsErrorBoundary = props => {
  return (
    <ErrorBoundary fallback={<h2>Oops! <Link to="/">Go back home?</Link></h2>}>
      <Details {...props}/>
    </ErrorBoundary>
  );
};

export default DetailsErrorBoundary;
