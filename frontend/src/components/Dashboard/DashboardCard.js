import React, { useState, useCallback } from 'react'
import {
  Page, Card, Button, Icon, InlineStack, Box, Modal, TextField, InlineGrid, Text, EmptyState, SkeletonBodyText, SkeletonDisplayText,
  BlockStack, Banner, Divider, ActionList, Popover, ButtonGroup, Select
} from '@shopify/polaris';
import { PlusIcon, DeleteIcon, ViewIcon, EditIcon, SearchIcon } from '@shopify/polaris-icons';
import { useSelector } from 'react-redux';

function DashboardCard(props) {
  const { state, changeNameValue, handleAddNote, handleCategorySelection } = props;
  const isLoading = useSelector(state => state.loading.isLoading);

  const options = [
    { label: 'All', value: 'all' },
    { label: 'Personal', value: 'personal' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Health', value: 'health' },
    { label: 'Shopping', value: 'shopping' },
    { label: 'Travel', value: 'travel' },
    { label: 'Education', value: 'education' },
    { label: 'Hobbies', value: 'hobbies' },
  ];

  const selectCategory = [
    { content: 'All', onAction: () => handleCategorySelection('All', 'all') },
    { content: 'Personal', onAction: () => handleCategorySelection('Personal', 'personal') },
    { content: 'Shopping', onAction: () => handleCategorySelection('Shopping', 'shopping') },
    { content: 'Health', onAction: () => handleCategorySelection('Health', 'health') },
    { content: 'Travel', onAction: () => handleCategorySelection('Travel', 'travel') },
    { content: 'Education', onAction: () => handleCategorySelection('Education', 'education') },
    { content: 'Finance', onAction: () => handleCategorySelection('Finance', 'finance') },
    { content: 'Hobbies', onAction: () => handleCategorySelection('Hobbies', 'hobbies') },
  ]

  return (
    <div>
      <Page
        title="Notes"
        subtitle="Your Digital Notebook"
        primaryAction={
          <InlineStack gap={200}>
            <ButtonGroup>
              <Popover
                active={state.popoverActive}
                activator={<Button variant="tertiary" onClick={() => changeNameValue({ popoverActive: !state.popoverActive })} disclosure>
                  {state.Category || "Select category"}
                </Button>}
                onClose={() => changeNameValue({ popoverActive: false })}
              >
                <ActionList
                  // actionRole="menuitem"
                  items={selectCategory}
                />
              </Popover>
              <div className="searchBar">
                <TextField
                  value={state.notesValue}
                  onChange={(e) => changeNameValue({ notesValue: e })}
                  autoComplete="off"
                  placeholder={'Search'}
                  id='search_feild'
                  suffix={<Icon
                    source={SearchIcon}
                    tone="base"
                  />}
                />
              </div>
              <Button icon={PlusIcon} variant="primary" onClick={handleAddNote}>
                <Text>Add notes</Text>
              </Button>
            </ButtonGroup>
          </InlineStack>
        }
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
                        <Text alignment="end" tone="subdued" variant='bodySm'>
                          {new Date(data.cdt).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                          }).replace(/(am|pm)/gi, (match) => match.toUpperCase())}
                        </Text>
                        {/* <Text alignment="end" tone="subdued" variant='bodySm'>{new Date(data.cdt).toLocaleString()}</Text> */}
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
          <Box paddingBlockEnd={200}>
            <Select
              label="Category"
              options={options}
              onChange={(e) => changeNameValue({ selectedCategory: e })}
              value={state.selectedCategory}
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
            <div className='data_desc'>{state.des}</div>
          </Box>
        </Modal.Section>
      </Modal >

      {/* edit data modal  */}
      < Modal
        open={state.editNoteModal}
        title={"Update note detail"}
        onClose={(e) => props.openCloseModal('editNoteModal', state.editNoteModal, e)}
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
          <Box paddingBlockEnd={200}>
            <Select
              label="Category"
              options={options}
              onChange={(e) => changeNameValue({ selectedCategory: e })}
              value={state.selectedCategory}
            />
          </Box>
          <InlineStack align='start'>
            <Box paddingBlockEnd={100} paddingBlockStart={200}>
              <Button size="large" id='Add' onClick={() => {
                props.handleUpdateNote();
              }}>Update</Button>
            </Box>
          </InlineStack>
        </Modal.Section>
      </Modal >

    </div>
  )
}
export default DashboardCard;