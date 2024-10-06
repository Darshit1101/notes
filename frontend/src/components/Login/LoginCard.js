import React from 'react'
import { Page, Card, Box } from '@shopify/polaris';
import AuthCard from './AuthCard';

function LoginCard(props) {
  return (
    <Page>
      {/* <Card > */}
      <Box padding={2400}>
        <Card>
          <AuthCard props={props} />
        </Card>
      </Box>
      {/* </Card> */}
    </Page>
  )
}

export default LoginCard;
