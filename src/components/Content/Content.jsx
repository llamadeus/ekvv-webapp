import { getEvents } from 'app/selectors/schedule';
import NotFound from 'app/views/NotFound';
import Schedule from 'app/views/Schedule';
import Settings from 'app/views/Settings';
import Start from 'app/views/Start';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router-dom';
import styles from './styles.module.scss';


/**
 * Content component
 *
 * @returns {*}
 */
export default function Content(props) {
  const events = useSelector(getEvents);
  const content = useMemo(() => {
    if (events === null) {
      return (
        <Switch>
          <Route path="/" component={Start} exact/>
          <Route component={NotFound}/>
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path="/" component={Schedule} exact/>
        <Route path="/settings" component={Settings} exact/>
        <Route component={NotFound}/>
      </Switch>
    );
  }, [events]);
  const rootClasses = classNames(styles.root, {
    'app-navigation-visible': props.appNavigationVisible,
  });

  return (
    <div className={rootClasses}>
      <div className="tw-flex tw-flex-1 tw-flex-col tw-w-screen tw-pt-4 tw-pb-2 tw-px-4 md:tw-max-w-2xl md:tw-mx-auto">
        {content}
      </div>
    </div>
  );
}

Content.propTypes = {
  appNavigationVisible: PropTypes.bool.isRequired,
};
