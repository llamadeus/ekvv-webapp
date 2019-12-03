import { Layout } from 'antd';
import AppNavigation from 'app/components/AppNavigation';
import Content from 'app/components/Content';
import NotchFix from 'app/components/NotchFix';
import { getEvents } from 'app/selectors/schedule';
import { isWebapp } from 'app/utils/app';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';


/**
 * App component
 *
 * @returns {*}
 */
export default function App() {
  const events = useSelector(getEvents);
  const maybeWebappHelmet = useMemo(() => {
    if (!isWebapp()) {
      return false;
    }

    return (
      <Helmet>
        <style type="text/css">{`
body {
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  overscroll-behavior-y: contain;
}
`}
        </style>
      </Helmet>
    );
  }, []);
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
