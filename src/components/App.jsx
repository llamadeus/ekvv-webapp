import { Layout } from 'antd';
import AppNavigation from 'app/components/AppNavigation';
import Content from 'app/components/Content';
import NotchFix from 'app/components/NotchFix';
import WebappTouchFix from 'app/components/WebappTouchFix';
import { getEvents } from 'app/selectors/schedule';
import { isWebapp } from 'app/utils/app';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';


/**
 * App component
 *
 * @returns {*}
 */
export default function App() {
  const events = useSelector(getEvents);
  const maybeWebappHelmet = useMemo(() => (
    isWebapp()
      ? <WebappTouchFix/>
      : false
  ), []);
  const maybeNotchFix = useMemo(() => (
    isWebapp()
      ? <NotchFix/>
      : false
  ), []);
  const maybeAppNavigation = useMemo(() => (
    events !== null
      ? <AppNavigation/>
      : false
  ), [events]);

  return (
    <>
      {maybeWebappHelmet}

      <Layout className="tw-flex tw-flex-1 tw-flex-col">
        <Content/>

        {maybeNotchFix}
        {maybeAppNavigation}
      </Layout>
    </>
  );
}
