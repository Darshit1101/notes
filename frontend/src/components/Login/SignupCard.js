import React from 'react';
import { BlockStack, TextField, Text, InlineStack, Button, Box } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';

function SignupCard({ props }) {
    console.log("SignupCard", props)
    const { state, validator, changeNameValue } = props;

    return (
        <div>
            <Box paddingBlockEnd={400}>
                <Text variant='headingLg' as='h3' fontWeight='bold'>Register</Text>
            </Box>
            <BlockStack gap={200}>
                <div>
                    <TextField
                        label="Full Name"
                        value={state.fn}
                        onChange={(e) => changeNameValue({ fn: e })}
                        autoComplete="off"
                    // error={state.errMessage.fullName ? state.errMessage.fullName : false}
                    />
                    {/* {validator.message('fullName', state.fn, 'required')} */}
                </div>
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
                <div>
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
                <div>
                    <Button onClick={props.registerData}>Register</Button>
                </div>
                <InlineStack gap={300} blockAlign='center' wrap={false}>
                    <Text variant='headingSm' as='p' fontWeight='regular'>Already have an account ?</Text>
                    <Button variant='plain' icon={ArrowRightIcon} onClick={() => changeNameValue({ isConfiguration: 'signIn', errMessage: {} })}>Log in</Button>
                </InlineStack>
            </BlockStack>
        </div>
    );
}

export default SignupCard;