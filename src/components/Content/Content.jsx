import LoadingSpinner from 'app/components/LoadingSpinner';
import { getEvents } from 'app/selectors/schedule';
import { getInitialized } from 'app/selectors/ui';
import NotFound from 'app/views/NotFound';
import Schedule from 'app/views/Schedule';
import Settings from 'app/views/Settings';
import Start from 'app/views/Start';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Switch,
} from 'react-router-dom';


/**
 * Content component
 *
 * @returns {*}
 */
export default function Content() {
  const initialized = useSelector(getInitialized);
  const events = useSelector(getEvents);

  if (!initialized) {
    return (
      <LoadingSpinner/>
    );
  }

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
}
