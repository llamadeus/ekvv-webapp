import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { findDOMNode } from 'react-dom';


/**
 * Wraps the given component with a HOC which computes the available space and passes it to `WrappedComponent`.
 *
 * @param WrappedComponent
 * @returns {AvailableSpace}
 */
export default function withAvailableSpace(WrappedComponent) {
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  /**
   * Class AvailableSpace
   */
  class AvailableSpace extends React.PureComponent {
    /**
     * Custom display name for React DevTools.
     *
     * @type {string}
     */
    static displayName = `AvailableSpace(${wrappedComponentName})`;

    /**
     * Component state.
     *
     * @type {Object}
     */
    state = {
      ready: false,
      width: null,
      height: null,
    };

    /**
     * Called when the component did mount.
     */
    componentDidMount() {
      this.updateState();

      window.addEventListener('resize', this.handleResize);
    }

    /**
     * Called when the component will unmount.
     */
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    /**
     * Compute how much space is available and update state.
     */
    updateState() {
      const parent = findDOMNode(this).parentElement;
      const style = window.getComputedStyle(parent);
      const width = parseFloat(style.getPropertyValue('width'));
      const height = parseFloat(style.getPropertyValue('height'));

      this.setState({
        width,
        height,
        ready: true,
      });
    }

    /**
     * Update state when window was resized.
     */
    handleResize = () => {
      this.updateState();
    };

    /**
     * Render the component.
     *
     * @returns {*}
     */
    render() {
      if (!this.state.ready) {
        return (
          <div/>
        );
      }

      return (
        <WrappedComponent
          availableWidth={this.state.width}
          availableHeight={this.state.height}
          {...this.props}
        />
      );
    }
  }

  hoistNonReactStatic(AvailableSpace, WrappedComponent);

  return AvailableSpace;
}
