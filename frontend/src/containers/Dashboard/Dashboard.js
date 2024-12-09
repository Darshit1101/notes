import React from 'react'
import { Page, Card, Grid } from '@shopify/polaris';

const Dashboard = () => {
  return (
    <div>
      <Page
        title="Notes"
        subtitle="Your Digital Notebook"
      >
        <Card>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card title="Sales" sectioned>
                <p>View a summary of your online store’s sales.</p>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card title="Orders" sectioned>
                <p>View a summary of your online store’s orders.</p>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card title="Orders" sectioned>
                <p>View a summary of your online store’s orders.</p>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card title="Orders" sectioned>
                <p>View a summary of your online store’s orders.</p>
              </Card>
            </Grid.Cell>
          </Grid>
        </Card>
      </Page>
    </div>
  )
}

export default Dashboard
