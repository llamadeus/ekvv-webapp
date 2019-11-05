import { Layout } from 'antd';
import Content from 'app/components/Content';
import Navigation from 'app/components/Navigation';
import { isWebapp } from 'app/utils/app';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';


/**
 * App component
 *
 * @returns {*}
 */
export default function App() {
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

      <Navigation/>

      <div className="tw-container tw-flex tw-flex-1 tw-mx-auto">
        <Layout.Content className="tw-flex tw-flex-col tw-max-w-sm tw-mx-auto tw-pt-6 tw-pb-4 tw-px-4 sm:tw-px-0">
          <Content/>
        </Layout.Content>
      </div>
    </Layout>
  );
}
