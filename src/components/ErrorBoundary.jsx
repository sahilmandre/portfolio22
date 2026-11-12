import { Component } from 'react'

/**
 * Minimal error boundary. Used to guard the WebGL canvases so that a device
 * without WebGL (or a runtime hiccup) silently falls back to the CSS layer
 * instead of crashing the page.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.warn('Canvas fallback:', error)
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
