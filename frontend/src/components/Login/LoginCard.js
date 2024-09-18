import React from 'react'
import { Page, Card } from '@shopify/polaris';
import AuthCard from './AuthCard';

function LoginCard(props) {
  return (
    <Page>
      <Card >
        <AuthCard props={props} />
      </Card>
    </Page>
  )
}

export default LoginCard;
