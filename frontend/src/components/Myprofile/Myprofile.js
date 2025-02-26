import { BlockStack, Box, Button, Icon, Modal, Page, PageActions, Text, InlineGrid, TextField } from '@shopify/polaris'
import { DeleteIcon, HideIcon, ViewIcon, SearchIcon } from '@shopify/polaris-icons'

import React from 'react'

function MyprofileCard(props) {

  const { state, changeNameValue, handleBackToMain, isShwBack, handleChangePassword, validator } = props;

  return (
    <div className='sidebar-animie'>
      <Page title="Profile"
        backAction={isShwBack === true ? { onAction: () => handleBackToMain() } : false}
      >
        <Box background='bg-surface' padding={400} id='profileBox-bottom-space' borderRadius='200'>
          <BlockStack gap={500}>

            <Box padding={400} id='customebg-color' borderRadius='100'>
              <BlockStack gap={200}>
                <Box>
                  <Text variant='headingMd' as='p' fontWeight='semibold'>Change password</Text>
                </Box>

                <InlineGrid gap="300" columns={{ xs: 1, sm: 2, md: 2 }}>
                  <div className='divCpass'>
                    <TextField
                      label={<Text tone="subdued">Current Password</Text>}
                      placeholder='Enter current password'
                      type={state.isCurnPassVisible ? 'text' : 'password'}
                      onChange={(e) => changeNameValue({ pd: e })}
                      value={state.pd}
                      error={state.errMessage?.pd ? 'The current password field is required.' : false}
                    />
                    {validator.message('pd', state.pd, 'required')}
                    <Button
                      icon={state.isCurnPassVisible ? HideIcon : ViewIcon}
                      onClick={() => changeNameValue({ isCurnPassVisible: !state.isCurnPassVisible })}
                      plain
                      variant='monochromePlain'
                    />
                  </div>

                  <div className='divCpass'>
                    <TextField
                      label={<Text tone="subdued">New Password</Text>}
                      placeholder='New Password'
                      type={state.isNewPassVisible ? 'text' : 'password'}
                      onChange={(e) => changeNameValue({ npd: e })}
                      value={state.npd}
                      error={state.errMessage?.npd ? 'The new password field is required.' : false}
                    />
                    {validator.message('npd', state.npd, 'required')}
                    <Button
                      icon={state.isNewPassVisible ? HideIcon : ViewIcon}
                      onClick={() => changeNameValue({ isNewPassVisible: !state.isNewPassVisible })}
                      plain
                      variant='monochromePlain'
                    />
                  </div>
                </InlineGrid>
                <Box paddingBlockStart={200}>
                  <Button variant="primary" tone='success' onClick={() => handleChangePassword()}>Save</Button>
                </Box>
              </BlockStack>
            </Box>

            {/* delete account */}
            <Box id='customebg-color' borderRadius='100'>
              <Box padding={400}>
                <div className='deleteBox' onClick={() => changeNameValue({ deleteOpen: true })}>
                  <Icon source={DeleteIcon} tone="critical" />
                  <Text variant="headingXs" as="h6">Delete Account</Text>
                </div>
              </Box>
            </Box>

            {/* delete account modal */}
            <Modal
              size='small'
              open={state.deleteOpen}
              title={<Text variant='headingMd' fontWeight='bold'>Confirmation</Text>}
              onClose={() => changeNameValue({ deleteOpen: false })}>
              <Modal.Section>
                <div>
                  <Text fontWeight='medium' variant='headingSm' as='h6'>Are you sure you want to delete your account?</Text>
                  <PageActions
                    primaryAction={<Button variant='primary' tone='success' onClick={() => props.handleDelAccount()}>Yes</Button>}
                    secondaryActions={[{
                      content: "No",
                      onAction: () => changeNameValue({ deleteOpen: false })
                    }]} />
                </div>
              </Modal.Section>
            </Modal>

          </BlockStack>
        </Box>
      </Page>
    </div>
  )
}

export default MyprofileCard