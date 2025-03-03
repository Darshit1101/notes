import React from 'react'
import {
    IndexTable, useSetIndexFiltersMode, Divider, InlineStack, DatePicker, IndexFilters, useBreakpoints, Text, Card, Page, Button, Popover, Box, ButtonGroup, Modal, PageActions, InlineGrid, TextField, OptionList, Tooltip,
    BlockStack, IndexFiltersMode, EmptySearchResult, Banner, Icon
} from "@shopify/polaris";
import { ArrowDiagonalIcon, DeleteIcon } from '@shopify/polaris-icons';
import moment from 'moment';

function ManageNotesCard(props) {
    const { state, handledeleteModal } = props;

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
                                >
                                    <IndexTable.Cell>
                                        <Text variant="bodyMd" fontWeight="bold" as="span">
                                            {props.getIndexNumber(index)}
                                        </Text>
                                    </IndexTable.Cell>
                                    <IndexTable.Cell><div id='noteTitle'>{i.tit}</div></IndexTable.Cell>
                                    <IndexTable.Cell>{moment(new Date(i.cdt)).format('MMM-DD-YYYY hh:mm:ss a')}</IndexTable.Cell>

                                    <IndexTable.Cell>
                                        <div id="deleteBox" onClick={() => handledeleteModal(i._id)}>
                                            <Banner hideIcon tone='critical'>
                                                <Icon
                                                    source={DeleteIcon}
                                                    tone="critical"
                                                />
                                            </Banner>
                                        </div>
                                    </IndexTable.Cell>
                                </IndexTable.Row>
                            )
                        })}

                    </IndexTable>
                </Card>
            </Page>
        </div>
    )
}
export default ManageNotesCard;