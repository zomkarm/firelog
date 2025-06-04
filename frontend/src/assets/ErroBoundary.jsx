import React from 'react';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('React error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-700">Error: {this.state.error.message}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
