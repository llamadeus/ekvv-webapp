import React from 'react';


/**
 * Class Navigation
 */
export default class Navigation extends React.PureComponent {
  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <div className="flex items-center justify-between flex-wrap p-6" style={{ backgroundColor: '#008950' }}>
        <div className="container mx-auto">
          <div className="text-xl text-white">
            eKVV
          </div>
        </div>
      </div>
    );
  }
}
