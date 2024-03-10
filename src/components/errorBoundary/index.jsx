import { message } from "antd";
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    message.error(info?.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong</p>
    }

    return this.props.children;
  }
}