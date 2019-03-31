import { connect } from 'react-redux';


/**
 * Map state to props.
 *
 * @param stateToProps
 */
export function mapStateToProps(stateToProps) {
  return connect(stateToProps);
}

/**
 * Map dispatch to props.
 *
 * @param dispatchToProps
 */
export function mapDispatchToProps(dispatchToProps) {
  return connect(undefined, dispatchToProps);
}
