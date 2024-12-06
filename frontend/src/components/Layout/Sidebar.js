import React from 'react'
import { Navigation } from '@shopify/polaris';
import { HomeIcon } from '@shopify/polaris-icons';

function Sidebar() {
  return (
    <div>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              label: 'Home',
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
