import { Component } from 'react';
import { ErrorInfo } from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
	children?: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError?: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {

	constructor(props: { children: ReactNode }) {
		super(props);

		this.state = {
			hasError: false
		};

	}

	static defaultProps = {
		fallback: null
	};

	static getDerivedStateFromError = (): State => {
		return { hasError: true };
	};

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary component caught an error', error, errorInfo);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return this.props.fallback || (
				<h2>
					There was an error with this listing. <Link to="/">Click here to return to the home page.</Link>
				</h2>
			);
		}

		return this.props.children;
	}
}
