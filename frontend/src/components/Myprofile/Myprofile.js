import { BlockStack, Box, Button, Icon, Modal, Page, PageActions, Text } from '@shopify/polaris'
import { DeleteIcon } from '@shopify/polaris-icons'

import React from 'react'

function MyprofileCard(props) {

  const { state, changeNameValue, handleBackToMain, isShwBack } = props;

  return (
    <div className='sidebar-animie'>
      <Page title="Profile"
        backAction={isShwBack === true ? { onAction: () => handleBackToMain() } : false}
      >
        <Box background='bg-surface' padding={400} id='profileBox-bottom-space' borderRadius='200'>
          <BlockStack gap={500}>

            {/* delete account */}
            <Box id='customebg-color' borderRadius='100'>
              <Box padding={400}>
                <div className='deleteBox' onClick={() => changeNameValue({ deleteOpen: true })}>
                  <Icon source={DeleteIcon} tone="critical" />
                  <Text variant="headingXs" as="h6">Delete Account</Text>
                </div>
              </Box>
            </Box>

            <Modal // delete account modal
              size='small'
              open={state.deleteOpen}
              title={<Text variant='headingMd' fontWeight='bold'>Confirmation</Text>}
              onClose={() => changeNameValue({ deleteOpen: false })}>
              <Modal.Section>
                <div>
                  <Text fontWeight='medium' variant='headingMd' as='h6'>Are you sure you want to delete your account?</Text>
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