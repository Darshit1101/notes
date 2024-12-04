import React from 'react';
import { BlockStack, TextField, Text, InlineStack, Button, Box, Page, Card } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import { Link } from 'react-router-dom';

function SignupCard(props) {
  const { state, validator, changeNameValue, registerData } = props;

  return (
    <div className='page-login-wrap'>
      <Page>
        <Card>
          <Box padding={200}>
            <BlockStack gap={200} >
              <Box paddingBlockEnd={200}>
                <Text variant='headingLg' as='h3' fontWeight='bold'>Register</Text>
              </Box>
              <div>
                <TextField
                  label="Full name"
                  value={state.fn}
                  onChange={(e) => changeNameValue({ fn: e })}
                  autoComplete="off"
                  placeholder='Enter your full name'
                  error={state.errMessage.fullName ? state.errMessage.fullName : false}
                />
                {validator.message('fullName', state.fn, 'required')}
              </div>
              <div>
                <TextField
                  label="Email"
                  type='email'
                  value={state.e}
                  onChange={(e) => changeNameValue({ e: e })}
                  autoComplete="off"
                  placeholder='Enter your email'
                  error={state.errMessage.email ? state.errMessage.email : false}
                />
                {validator.message('email', state.e, 'required')}
              </div>
              <div>
                <TextField
                  label="Password"
                  type='password'
                  value={state.pd}
                  onChange={(e) => changeNameValue({ pd: e })}
                  autoComplete="off"
                  placeholder='Enter your password'
                  error={state.errMessage.password ? state.errMessage.password : false}
                />
                {validator.message('password', state.pd, 'required')}
              </div>
              <Box paddingBlockStart={200}>
                <div>                                                       
                  <Button onClick={registerData}>Register</Button>
                </div>
              </Box>
              <InlineStack gap={300} blockAlign='center' wrap={false}>
                <Text variant='headingSm' as='p' fontWeight='regular'>Already have an account ?</Text>
                <Link to={'/login'} id='link_login_register'>
                  <Button variant='plain' icon={ArrowRightIcon} onClick={() => changeNameValue({ errMessage: {} })}>Log in</Button>
                </Link>
              </InlineStack>
            </BlockStack>
          </Box>
        </Card>
      </Page>
    </div>
  );
}

export default SignupCard;