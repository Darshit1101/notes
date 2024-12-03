import React from 'react'
import { BlockStack, Box, Button, InlineStack, Text, TextField, Page, Card } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import { Link } from 'react-router-dom';

function LoginCard(props) {
  const { state, changeNameValue, validator, handleUserLogin, loginData } = props;

  return (
    <div className='page-login-wrap'>
      <Page>
        <Card>
          <BlockStack gap={200} >
            <Box paddingBlockEnd={200}>
              <Text variant='headingLg' as='h3' fontWeight='bold'>Login</Text>
            </Box>
            <div>
              <TextField
                label="Email"
                type='email'
                value={state.e}
                onChange={(e) => changeNameValue({ e: e })}
                autoComplete="off"
              // error={state.errMessage.email ? state.errMessage.email : false}
              />
              {/* {validator.message('email', state.e, 'required')} */}
            </div>
            <div onKeyDown={(e) => {
              if (e.key === 'Enter') { //onEnter login
                e.preventDefault();
                // handleUserLogin();
              }
            }}
            >
              <TextField
                label="Password"
                type='password'
                value={state.pd}
                onChange={(e) => changeNameValue({ pd: e })}
                autoComplete="off"
              // error={state.errMessage.password ? state.errMessage.password : false}
              />
              {/* {validator.message('password', state.pd, 'required')} */}
            </div>
            <Box paddingBlockStart={100}>
              <div >
                <Button onClick={loginData}>Login</Button>
              </div>
            </Box>
            <InlineStack gap={300} blockAlign='center' wrap={false}>
              <Text variant='headingSm' as='p' fontWeight='regular'>Don't have an account ?</Text>
              <Link to='/register' id='link_login_register'>
                <Button variant='plain' icon={ArrowRightIcon} onClick={() => changeNameValue({ errMessage: {} })}>Create an account</Button>
              </Link>
            </InlineStack>
          </BlockStack>
        </Card>
      </Page>
    </div>
  )
}

export default LoginCard;
