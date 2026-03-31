'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class OrderErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[Order Error]', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="order-empty-state">
          <div>
            <p className="order-error-title">Something went wrong</p>
            <p className="order-error-message">We couldn&apos;t load the ordering experience. Please try refreshing.</p>
            <button
              className="order-confirm-btn"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
