import React from 'react'
import { Navigation } from '@shopify/polaris';
import { HomeIcon,OrderIcon,ProductIcon } from '@shopify/polaris-icons';

function Sidebar() {
  return (
    <div>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              label: 'Home',
              icon: HomeIcon,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrderIcon,
              badge: '15',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductIcon,
            },
          ]}
        />
      </Navigation>
    </div>
  )
}

export default Sidebar;
