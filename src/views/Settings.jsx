import {
  Button,
  Card,
  Form,
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { reloadCalendar } from '../effects/schedule';
import { getIsLoading } from '../selectors/ui';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../utils/redux';


/**
 * Class Settings
 */
@mapStateToProps(state => ({
  isLoading: getIsLoading(state),
}))
@mapDispatchToProps(dispatch => bindActionCreators({
  onReloadCalendar: reloadCalendar,
}, dispatch))
export default class Settings extends React.PureComponent {
  /**
   * Prop types.
   *
   * @type {Object}
   */
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onReloadCalendar: PropTypes.func.isRequired,
  };

  /**
   * Render the component.
   *
   * @return {*}
   */
  render() {
    return (
      <>
        <Card title="Stundenplan">
          <p>Lade deinen Stundenplan neu.</p>

          <Form.Item className="tw-text-right">
            <Button type="primary" onClick={this.props.onReloadCalendar} loading={this.props.isLoading}>
              Stundenplan aktualisieren
            </Button>
          </Form.Item>
        </Card>

        <Card title="Allgemein">
          <p>Aktualisiere auf die neueste Version.</p>

          <Form.Item className="tw-text-right">
            <Button type="primary" onClick={() => window.location.reload(true)}>
              App aktualisieren
            </Button>
          </Form.Item>
        </Card>
      </>
    );
  }
}
