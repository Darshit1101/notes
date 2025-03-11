import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@shopify/polaris';
import { HomeIcon, HomeFilledIcon, WorkFilledIcon, WorkIcon, SettingsFilledIcon, SettingsIcon, FileFilledIcon, FileIcon } from '@shopify/polaris-icons';
import { useSelector } from "react-redux";

function Sidebar() {
  const navigate = useNavigate();
  let path = window.location.pathname;

  const changeRoute = (pathName) => {
    navigate(pathName);
  };

  const [count, setCount] = useState(0);

  const getNoteCount = useSelector(state => state.dashboard.getAll?.count)
  useEffect(() => {
    if (getNoteCount !== undefined && getNoteCount !== null) {
      setCount(getNoteCount);
    }
  }, [getNoteCount]);

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
              badge: count ? String(count) : undefined,
            },
            {
              label: 'Manage notes',
              icon: path === '/managenotes' ? FileFilledIcon : FileIcon,
              selected: path === '/managenotes',
              onClick: () => changeRoute('/managenotes'),
            },

          ]}
        />
        <Navigation.Section
          title="Testing section"
          fill
          items={[
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
