import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };

  }

  static defaultProps = {
    fallback: null
  };

  static getDerivedStateFromError = () => {
    return { hasError: true };
  };

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary component caught an error', error, errorInfo);
  }

  render() {
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
