import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@shopify/polaris';
import { HomeIcon, HomeFilledIcon, WorkFilledIcon, WorkIcon, SettingsFilledIcon, SettingsIcon } from '@shopify/polaris-icons';

function Sidebar() {
  const navigate = useNavigate();
  let path = window.location.pathname;

  const changeRoute = (pathName) => {
    navigate(pathName);
  };

  return (
    <div>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              label: 'Dashboard',
              icon: path === '/dashboard' ? HomeFilledIcon : HomeIcon,
              selected: path === '/dashboard',
              onClick: () => changeRoute('/dashboard'),
            },
            {
              label: 'Testing',
              icon: path === '/testing' ? WorkFilledIcon : WorkIcon,
              selected: path === '/testing',
              onClick: () => changeRoute('/testing'),
            },
          ]}
        />
        <Navigation.Section
          items={[
            {
              label: 'Settings',
              icon: path === '/setting' ? SettingsFilledIcon : SettingsIcon,
              selected: path === '/setting',
              onClick: () => changeRoute('/setting')
            }
          ]}
        />
      </Navigation>
    </div>
  )
}

export default Sidebar;
