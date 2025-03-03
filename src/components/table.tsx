import React, {useState} from 'react';
import {Button, Col, Row, Table, TableColumnsType} from 'antd';
import {useList} from "@refinedev/core";
import {currencyNumber} from "../utility/currency-numbers";
import {SMSBox} from "./sms/sms-send-box";

//TO DO
// Fix table row selection via the state variables
// Update handle OK on send-sms-box file

interface DataType {
    id: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    mobile: string;
    amount: number;
    paid: number;
    balance: number;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Full Name',
        key: 'fullName',
        render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
        title: 'Mobile',
        key: 'mobile',
        render: (_, record) => `${record.countryCode}${record.mobile}`,
    },    
    {
        title: 'Ahadi',
        dataIndex: 'amount',
        key: "amount",
        render: (value: number) => currencyNumber(value)
    },
    {
        title: 'Iliyolipwa',
        dataIndex: 'paid',
        key: "paid",
        render: (value: number) => currencyNumber(value)
    },
    {
        title: 'Iliyobakia',
        dataIndex: 'balance',
        key: "balance",
        render: (value: number) => currencyNumber(value)
    },
];

export const MkekaTable = ({balance, userId, events, currentEvent}: { balance: number, userId: string, events: any, currentEvent: string }) => {
    const {data: mkekaList, isLoading: mkekaLoading} = useList({
        resource: "mkeka",
        meta: {
            select: `id,firstName,lastName,countryCode,mobile,amount,paid,balance`
        },
        pagination: {
            pageSize: 10000,
        },
        sorters: [
            {
                field: "firstName",
                order: "asc",
            },
        ],
        filters: [
            {
              field: "relatedEvent",
              operator: "eq",
              value: currentEvent
            },
        ],
    })

    const unpaidPledgers = mkekaList?.data.filter((row) => row.balance > 0) || [];
    const paidupPledgers = mkekaList?.data.filter((row) => row.balance <= 0) || [];
    const mkekaPledgers = mkekaList?.data.map((row) => row.id) || [];

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedPledgers, setSelectedPledgers] = useState([]);
    const [allPledgers, setAllPledgers] = useState(mkekaPledgers)
    const [wadaiwa, setWadaiwa] = useState(unpaidPledgers)
    const [wamalizaji, setWamalizaji] = useState(paidupPledgers)

    const isSelectedPledgersEmpty = (selectedPledgers: any[]): boolean => {
        return selectedPledgers.length === 0;
    };

    const stateCheck = isSelectedPledgersEmpty(selectedPledgers);

    // Row selection configuration
    const rowSelection = {
        type: "checkbox",
        columnWidth: 48,
        selectedRowKeys, // Tracks selected row keys
        onChange: (newSelectedRowKeys: React.Key[], newSelectedRows: DataType[]) => {
            // Update `selectedRowKeys`
            setSelectedRowKeys(newSelectedRowKeys);

            // Filter out rows that are no longer selected
            const updatedSelectedPledgers = selectedPledgers.filter((row) =>
                newSelectedRowKeys.includes(row.id)
            );

            // Add any newly selected rows to the state
            const newlySelectedPledgers = newSelectedRows.filter(
                (row) => !updatedSelectedPledgers.some((pledger) => pledger.id === row.id)
            );
            //FIX ME
            setSelectedPledgers([...updatedSelectedPledgers, ...newlySelectedPledgers]);

            //Reset all other states
            setWadaiwa([])
            setWamalizaji([])

        },
        selections: [
            {
                key: "selectRowsWithBalanceGreaterThanZero",
                text: "Wadaiwa Ahadi",
                onSelect: () => {
                    const keysToSelect = mkekaList?.data
                        .filter((row) => row.balance > 0)
                        .map((row) => row.id) || [];
                    //FIX ME
                    setSelectedRowKeys(keysToSelect);

                    // Select rows where balance > 0
                    const rowsToSelect = mkekaList?.data.filter((row) => row.balance > 0) || [];

                    setWadaiwa(rowsToSelect);

                    // Update selectedPledgers with wadaiwa
                    //FIX ME
                    setSelectedPledgers(rowsToSelect);

                    // Reset other states
                    setAllPledgers([]);
                    setWamalizaji([]);

                    console.log("wadaiwa: ", rowsToSelect); // Logs selected Wadaiwa
                },
            },
            {
                key: "selectRowsWithBalanceZeroOrLess",
                text: "Wamaliza Ahadi",
                onSelect: () => {
                    const keysToSelect = mkekaList?.data
                        .filter((row) => row.balance <= 0)
                        .map((row) => row.id) || [];
                    //FIX ME
                    setSelectedRowKeys(keysToSelect);

                    // Select rows where balance <= 0
                    const rowsToSelect = mkekaList?.data.filter((row) => row.balance <= 0) || [];

                    setWamalizaji(rowsToSelect);

                    // Update selectedPledgers with wamalizaji
                    //FIX ME
                    setSelectedPledgers(rowsToSelect);

                    // Reset other states
                    setAllPledgers([]);
                    setWadaiwa([]);
                },
            },
        ],
    };

    return (
        <Row gutter={[32, 32]} style={{marginTop: "18px"}}>
            {/* SMSBox: takes full width on mobile devices, 1/4 on large devices */}
            <Col xs={24} sm={24} xl={6} style={{height: "100%"}}>
                <SMSBox balance={balance} userId={userId} stateCheck={stateCheck} selectedPledgers={selectedPledgers} events={events}/>
            </Col>
            {/* MkekaTable: takes full width on mobile devices, 3/4 on large devices */}
            <Col xs={24} sm={24} xl={18} style={{height: "100%"}}>
                <Table<DataType>
                    rowKey="id"
                    virtual={true}
                    loading={mkekaLoading}
                    scroll={{x: 1, y: 400}}
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={mkekaList?.data as DataType[] | []}
                    size={"small"}
                    summary={(pageData) => {
                        let totalPledges = 0;
                        let totalCollections = 0;
                        let totalBalance = 0;
                        pageData.forEach(({amount, paid, balance}) => {
                            totalPledges += amount;
                            totalCollections += paid;
                            totalBalance += balance;
                        });
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={2}>Grand Totals</Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
                                        {currencyNumber(totalPledges)}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}>
                                        {currencyNumber(totalCollections)}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}>
                                        {currencyNumber(totalBalance)}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}
                />
            </Col>
        </Row>
    )

};
