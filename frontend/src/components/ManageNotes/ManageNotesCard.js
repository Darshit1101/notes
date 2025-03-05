import React from 'react'
import {
    IndexTable, useSetIndexFiltersMode, Divider, InlineStack, DatePicker, IndexFilters, useBreakpoints, Text, Card, Page, Button, Popover, Box, ButtonGroup, Modal, PageActions, InlineGrid, TextField, OptionList, Tooltip,
    BlockStack, IndexFiltersMode, EmptySearchResult, Banner, Icon,
} from "@shopify/polaris";
import { ViewIcon, DeleteIcon, PageDownIcon } from '@shopify/polaris-icons';
import moment from 'moment';

function ManageNotesCard(props) {
    const { state, changeNameValue, handledeleteModal, handleViewModal, handleDownloadModal } = props;

    const promotedBulkActions = [
        {
            content: 'Delete',
            onAction: () => props.onDeleteBulkAction()
        },
    ];

    return (
        <div>
            <Page
                title={"Manage notes"}
            >
                <Card padding={0}>
                    <IndexTable
                        itemCount={state.ManageNotes?.length}
                        headings={[
                            { title: 'No' },
                            { title: 'Title' },
                            { title: 'Created date' },
                            { title: 'Action' }
                        ]}
                        pagination={{
                            hasPrevious: state.paggiActive > 1 ? true : false,
                            hasNext: (state.paggiActive < state.pageNumber) ? true : false,
                            onPrevious: () => props.onPaggiCall('-1'),
                            onNext: () => props.onPaggiCall('+1')
                        }}
                        selectable={true}
                        promotedBulkActions={promotedBulkActions}
                        selectedItemsCount={props.selectedResources.length}
                        onSelectionChange={props.handleSelectionChange}
                    >
                        {state.ManageNotes && state.ManageNotes.length > 0 && state.ManageNotes.map((i, index) => {
                            return (
                                <IndexTable.Row
                                    id={i._id}
                                    key={index}
                                    selected={props.selectedResources.includes(i._id)}
                                    onClick={() => changeNameValue({})}  //for whole row click none
                                >
                                    <IndexTable.Cell>
                                        <Text variant="bodyMd" fontWeight="bold" as="span">
                                            {props.getIndexNumber(index)}
                                        </Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell><div id='noteTitle'>{i.tit}</div></IndexTable.Cell>
                                    <IndexTable.Cell>{moment(new Date(i.cdt)).format('MMM-DD-YYYY hh:mm:ss a')}</IndexTable.Cell>

                                    <IndexTable.Cell>
                                        <InlineStack gap={200}>
                                            <div id="action-box" onClick={() => handledeleteModal(i._id)}>
                                                <Banner hideIcon tone='critical'>
                                                    <Icon
                                                        source={DeleteIcon}
                                                        tone="critical"
                                                    />
                                                </Banner>
                                            </div>

                                            <div id="action-box" onClick={() => handleViewModal(i)}>
                                                <Banner hideIcon tone='success'>
                                                    <Icon
                                                        source={ViewIcon}
                                                        tone="success"
                                                    />
                                                </Banner>
                                            </div>

                                            <div id="action-box" onClick={() => handleDownloadModal(i)}>
                                                <Banner hideIcon tone='info'>
                                                    <Icon
                                                        source={PageDownIcon}
                                                        tone="info"
                                                    />
                                                </Banner>
                                            </div>
                                        </InlineStack>
                                    </IndexTable.Cell>
                                </IndexTable.Row>
                            )
                        })}

                    </IndexTable>
                </Card>
            </Page>

            {/* view data modal  */}
            < Modal
                open={state.viewDataModal}
                title={<div className='viewModal_title'>{state.tit}</div>}
                onClose={(e) => props.openCloseModal('viewDataModal', state.viewDataModal, e)}
            >
                <Modal.Section>
                    <Box paddingBlockEnd={0} paddingBlockStart={0}>
                        <div className='data_desc'>{state.des}</div>
                    </Box>
                </Modal.Section>
            </Modal >

            {/* dawnload data modal  */}
            < Modal
                open={state.dawnloadDataModal}
                title={'Dawnload note'}
                onClose={(e) => props.openCloseModal('dawnloadDataModal', state.dawnloadDataModal, e)}
            >
                <Modal.Section>
                    <div id='main-note-box'>
                        <div className='dawn_Modal_title'>{state.tit}</div>
                        <Box paddingBlockStart={400}>
                            <Divider />
                        </Box>
                        <Box paddingBlockStart={400}>
                            <div className='data_desc'>{state.des}</div>
                        </Box>
                    </div>
                    <Box paddingBlockStart={400}>
                        <Divider />
                    </Box>
                    <InlineStack align='center'>
                        <Box paddingBlockStart={400}>
                            <Button variant="primary" tone="success" onClick={() => props.handleSaveNote()}>Dawnload</Button>
                        </Box>
                    </InlineStack>
                </Modal.Section>
            </Modal >

        </div>


    )
}
export default ManageNotesCard;