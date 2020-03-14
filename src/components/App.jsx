import { Layout } from 'antd';
import AppNavigation from 'app/components/AppNavigation';
import Content from 'app/components/Content';
import LoadingSpinner from 'app/components/LoadingSpinner';
import NotchFix from 'app/components/NotchFix';
import WebappTouchFix from 'app/components/WebappTouchFix';
import { useInitialize } from 'app/hooks/app';
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
  const initialized = useInitialize();
  const events = useSelector(getEvents);
  const content = useMemo(() => {
    if (!initialized) {
      return (
        <LoadingSpinner/>
      );
    }

    const showAppNavigation = events !== null;

    return (
      <>
        <Content appNavigationVisible={showAppNavigation}/>

        {isWebapp() && (
          <NotchFix/>
        )}
        {showAppNavigation && (
          <AppNavigation/>
        )}
      </>
    );
  }, [initialized, events]);

  return (
    <>
      {isWebapp() && (
        <WebappTouchFix/>
      )}

      <Layout className="tw-flex tw-flex-1 tw-flex-col">
        {content}
      </Layout>
    </>
  );
}
