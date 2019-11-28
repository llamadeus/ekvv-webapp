import { Layout } from 'antd';
import ControlledLink from 'app/components/ControlledLink';
import Menu from 'app/components/Menu';
import { showToday } from 'app/effects/schedule';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';


/**
 * Navigation component
 *
 * @param props
 * @returns {*}
 */
export default function Navigation(props) {
  const { withMenu } = props;
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const handleAppButtonClick = useCallback(() => {
    setShowMenu(false);
    dispatch(showToday());
  }, [dispatch]);
  const maybeMenu = useMemo(() => {
    if (!withMenu) {
      return false;
    }

    return (
      <Menu
        show={showMenu}
        onUpdateShow={setShowMenu}
      />
    );
  }, [withMenu, showMenu]);

  return (
    <>
      <Layout.Header className="tw-text-white tw-z-50">
        <div className="tw-mx-auto md:tw-max-w-2xl">
          <div className="tw-flex tw-flex-1 tw-justify-between md:tw--mx-4">
            <ControlledLink
              href="/"
              onClick={handleAppButtonClick}
              className="tw-text-white hover:tw-text-white tw-text-xl tw-px-4"
            >
              eKVV
            </ControlledLink>

            {maybeMenu}
          </div>
        </div>
      </Layout.Header>
    </>
  );
}

Navigation.propTypes = {
  withMenu: PropTypes.bool.isRequired,
};
