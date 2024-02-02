import Pet from './Pet';

const Results = ({ pets }) => {
	return (
		<div className="search">
			{!pets.length ? (
				<h1>No Pets Found</h1>
			) : (
				pets.map(({ name, animal, id, breed, images, city, state }) => (
					<Pet key={id}
						id={id}
						name={name}
						animal={animal}
						breed={breed}
						images={images}
						location={`${city}, ${state}`}/>
				))
			)}
		</div>
	);
};

export default Results;
