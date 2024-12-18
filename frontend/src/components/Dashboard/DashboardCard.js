import React from 'react'
import {
  Page, Card, Button, Icon, InlineStack, Box, Modal, TextField, InlineGrid, Text, EmptyState, SkeletonBodyText, SkeletonDisplayText,
  BlockStack, Banner, Divider
} from '@shopify/polaris';
import { PlusIcon, DeleteIcon, ViewIcon, EditIcon } from '@shopify/polaris-icons';
import { useSelector } from 'react-redux';

function DashboardCard(props) {
  const { state, changeNameValue, handleAddNote } = props;
  const isLoading = useSelector(state => state.loading.isLoading);

  return (
    <div>
      <Page
        title="Notes"
        subtitle="Your Digital Notebook"
        primaryAction={<Button variant="primary" onClick={handleAddNote}>
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
        {state.Allnotes && state.Allnotes.length > 0 ?

          <InlineGrid columns={{ xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }} gap={400}>
            {state.Allnotes && state.Allnotes.length > 0 ? state.Allnotes.map((data, index) => {
              return (
                <>
                  <Box height="300px" background="bg-surface" borderRadius="200" borderColor="border" borderWidth="025" padding="400" key={index}>
                    <BlockStack gap={100}>
                      <Text variant='headingMd' as='p' fontWeight='semibold' id='tit'>
                        {data.tit}
                      </Text>
                      <Text tone="subdued" id='des'>
                        {data.des}
                      </Text>
                      <Divider />
                    </BlockStack>
                    <Box paddingBlockStart={300}>
                      <InlineStack align='end' gap={200}>
                        <div id="view_banner" onClick={() => props.handleViewNote(data)}>
                          <Banner hideIcon >
                            <Icon
                              source={ViewIcon}
                              tone="success"
                            />
                          </Banner>
                        </div>
                        <div id="edit_banner" onClick={() => props.handleEditNoteData(data)}>
                          <Banner hideIcon >
                            <Icon
                              source={EditIcon}
                              tone="warning"
                            />
                          </Banner>
                        </div>
                        <div id="delete_banner" onClick={() => props.handledeleteCard(data._id)}>
                          <Banner hideIcon >
                            <Icon
                              source={DeleteIcon}
                              tone="critical"
                            />
                          </Banner>
                        </div>
                      </InlineStack>
                      <Box paddingBlockStart={300}>
                        <Text alignment="end" tone="subdued" variant='bodySm'>{new Date(data.cdt).toLocaleString()}</Text>
                      </Box>
                    </Box>
                  </Box>
                </>
              )
            }) : ''}
          </InlineGrid>
          :
          <>
            {isLoading ?
              <InlineGrid columns={3} gap={300}>
                <Card gap={400}>
                  <BlockStack gap={300}>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines={2} />
                  </BlockStack>
                </Card>
                <Card gap={400}>
                  <BlockStack gap={300}>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines={2} />
                  </BlockStack>
                </Card>
                <Card gap={400}>
                  <BlockStack gap={300}>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines={2} />
                  </BlockStack>
                </Card>
              </InlineGrid>
              :
              state.Allnotes && state.Allnotes.length === 0 && <Card sectioned>
                <EmptyState
                  heading="You have not added any notes yet."
                  action={{ content: 'Add note', onClick: handleAddNote }}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                  fullWidth
                >
                </EmptyState>
              </Card>
            }
          </>
        }
      </Page>

      {/* add note modal  */}
      <Modal
        open={state.addNoteModal}
        title="Add new note"
        onClose={(e) => { props.openCloseModal('addNoteModal', state.addNoteModal, e) }}
      >
        <Modal.Section>
          <TextField
            label="Title"
            placeholder='Enter title'
            value={state.tit}
            onChange={(e) => changeNameValue({ tit: e })}
            autoComplete="off"
          />
          <Box paddingBlockStart={200} paddingBlockEnd={200}>
            <TextField
              label="Description"
              placeholder='Enter description'
              multiline={4}
              value={state.des}
              onChange={(e) => changeNameValue({ des: e })}
              autoComplete="off"
            />
          </Box>
          <InlineStack align='start'>
            <Box paddingBlockEnd={100} paddingBlockStart={200}>
              <Button size="large" id='Add' onClick={() => {
                props.handleSaveNote();
              }}>Add</Button>
            </Box>
          </InlineStack>
        </Modal.Section>
      </Modal>

      {/* view data modal  */}
      < Modal
        open={state.viewNoteModal}
        title={state.tit}
        onClose={(e) => props.openCloseModal('viewNoteModal', state.viewNoteModal, e)}
      >
        <Modal.Section>
          <Box paddingBlockEnd={0} paddingBlockStart={0}>
            {state.des}
          </Box>
        </Modal.Section>
      </Modal >

    </div>
  )
}
export default DashboardCard;