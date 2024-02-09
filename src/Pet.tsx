import { Link } from 'react-router-dom';

import { Animal } from './APIResponse.type';
import { ReactElement } from 'react';

interface Props {
	name: string;
	animal: Animal;
	breed: string;
	images: string[];
	location: string;
	id: number;
}

const Pet = ({ name, animal, breed, location, images, id }: Props): ReactElement => {
	let hero = 'https://pets-images.dev-apis.com/pets/none.jpg';
	if (images && images.length) {
		hero = images[0];
	}

	return (
		<Link to={`/details/${id}`} className="pet">
			<div className="image-container">
				<img data-testid="thumbnail" src={hero} alt={name}/>
			</div>
			<div className="info">
				<h1>{name}</h1>
				<h2>{animal} – {breed} – {location}</h2>
			</div>
		</Link>
	);
};

export default Pet;
