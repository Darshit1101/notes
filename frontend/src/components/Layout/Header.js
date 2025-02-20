import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import { Frame, TopBar, } from '@shopify/polaris';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notes_logo } from '../../img';
import * as authDucks from '../../ducks/auth';
import { ExitIcon } from '@shopify/polaris-icons';

function Header(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    profile: {}
  })

  //set data in state
  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  //get profile data using redux useSelector
  const profile = useSelector((state) => state.auth.profile);

  //get profile data api call
  useEffect(() => {
    let userId = localStorage.getItem('id');
    dispatch(authDucks.getProfile(userId));
  }, []);

  //set profile data in state
  useEffect(() => {
    changeNameValue({ profile: profile });
  }, [profile]);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('ti');
    window.location.href = '/login';
  }

  const userMenuActions = [{
    items: [
      {
        icon: ExitIcon,
        content: 'Log out',
        onAction: () => handleLogout()
      }
    ],
  }];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={state.profile?.fn}
      initials={state.profile?.fn?.charAt(0).toUpperCase()}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const logo = {
    width: 86,
    topBarSource: notes_logo,
    accessibilityLabel: 'Notes',
  };

  return (
    <Frame
      logo={logo}
      topBar={topBarMarkup}
      navigation={<Sidebar />}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {props.component}
    </Frame>
  );
}

export default Header;