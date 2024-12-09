import React from 'react'
import { Page, Card, Grid, Button, Icon, InlineStack, Box } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';

const Dashboard = () => {
  return (
    <div>
      <Page
        title="Notes"
        subtitle="Your Digital Notebook"
        primaryAction={<Button variant="primary">
          <InlineStack blockAlign='center'>
            <Box paddingInlineEnd={100}>
              <Icon
                source={PlusIcon}
              />
            </Box>
            <span>Add notes</span>
          </InlineStack>
        </Button>}

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
