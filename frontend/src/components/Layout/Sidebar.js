import React from 'react'
import { Navigation } from '@shopify/polaris';
import { HomeIcon } from '@shopify/polaris-icons';

function Sidebar() {
  let path = window.location.pathname;
  
  return (
    <div>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              label: 'Dashboard',
              excludePaths: ['#'],
              icon: HomeIcon,
            },
          ]}
        />
      </Navigation>
    </div>
  )
}

export default Sidebar;
