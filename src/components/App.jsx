import { Layout } from 'antd';
import Content from 'app/components/Content';
import Navigation from 'app/components/Navigation';
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

  return (
    <Layout className="tw-flex tw-flex-1 tw-flex-col">
      {maybeWebappHelmet}

      <Navigation withMenu={events !== null}/>

      <div className="tw-flex tw-flex-1">
        <Layout.Content
          className="tw-flex tw-flex-col tw-pt-6 tw-pb-4 tw-px-4 md:tw-max-w-2xl md:tw-mx-auto md:tw-px-0"
        >
          <Content/>
        </Layout.Content>
      </div>
    </Layout>
  );
}
