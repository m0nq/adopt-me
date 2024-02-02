import { Component } from 'react';

export default class Carousel extends Component {
	state = {
		active: 0
	};

	static defaultProps = {
		images: ['https://pets-images.dev-apis.com/pets/none.jpg']
	};

	handleIndexClick = e => {
		this.setState({
			active: +e.target.dataset.index
		});
	};

	render() {
		const { active } = this.state;
		const { images } = this.props;

		return (
			<div className="carousel">
				<img src={images[active]} alt="animal"/>
				<div className="carousel-smaller">
					{images.map((photo, i) => {
						return (
							// eslint-disable-next-line
							<img key={photo}
								src={photo}
								className={i === active ? 'active' : ''}
								alt="animal thumbnail"
								onClick={this.handleIndexClick}
								data-index={i}/>
						);
					})}
				</div>
			</div>
		);
	}
}
