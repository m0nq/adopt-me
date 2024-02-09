import { lazy } from 'react';
import { useState } from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Params } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { adopt } from './adoptedPetSlice';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import { useGetPetQuery } from './petApiService';

const Modal = lazy(() => import('./Modal'));

const Details = (): ReactElement => {
	const { id }: Readonly<Params> = useParams();
	if (!id) {
		throw new Error('Why did you not give me an id? I have no id...');
	}

	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const { isLoading, data: pet } = useGetPetQuery(id);
	const dispatch = useDispatch();

	if (isLoading) {
		return (
			<div className="loading-pane">
				<h2 className="loader">🐶</h2>
			</div>
		);
	}

	if (!pet) {
		throw new Error('No pet!');
	}

	return (
		<div className="details">
			<Carousel images={pet.images}/>
			<div>
				<h1>{pet.name}</h1>
				<h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
				<button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
				<p>{pet.description}</p>
				{showModal ? (
					<Modal>
						<div>
							<h1>Would you like to adopt {pet.name}?</h1>
							<div className="buttons">
								<button onClick={() => {
									dispatch(adopt(pet));
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

const DetailsErrorBoundary = (): ReactElement => {
	return (
		<ErrorBoundary fallback={<h2>Oops! <Link to="/">Go back home?</Link></h2>}>
			<Details/>
		</ErrorBoundary>
	);
};

export default DetailsErrorBoundary;
