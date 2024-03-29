import { Component } from 'react';
import { MouseEvent } from 'react';
import { ReactElement } from 'react';

interface Props {
	images: string[];
}

export default class Carousel extends Component<Props> {
	state = {
		active: 0
	};

	static defaultProps = {
		images: ['https://pets-images.dev-apis.com/pets/none.jpg']
	};

	handleIndexClick = (e: MouseEvent<HTMLImageElement>) => {
		if (!(e.target instanceof HTMLElement)) {
			return;
		}

		this.setState({
			active: +(e.target.dataset.index ?? 0)
		});
	};

	render(): ReactElement {
		const { active } = this.state;
		const { images } = this.props;

		return (
			<div className="carousel">
				<img data-testid="hero" src={images[active]} alt="animal"/>
				<div className="carousel-smaller">
					{images.map((photo, i) => {
						return (
							// eslint-disable-next-line
							<img key={photo}
								src={photo}
								data-testid={`thumbnail${i}`}
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
