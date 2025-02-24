import { useTable } from '@refinedev/antd';
import { useGetIdentity, useOne } from '@refinedev/core';
import { Table, TableColumnsType, Tag, Tooltip } from 'antd'
import { formatDate, formatDateWithTime } from '../../utility/date-formater';
import { trimText } from '../../utility/propercase';

export const ReportsTable = () => {
    const { data: identity } = useGetIdentity();
    const userId = (identity as { id: string })?.id;

    const { data: profileInfo } = useOne({
      resource: "profiles",
      id: userId,
    }); 

    const {tableProps} = useTable({
        resource: "reports",
        pagination: {
            pageSize: 10,
          },
          filters: {
            permanent: [
              {
                field: "relatedEvent",
                operator: "eq",
                value: profileInfo?.data.currentEvent,
              },
            ],
          },
    })

    const columns: TableColumnsType = [
        {
            title: 'Date Sent',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (value: string) => formatDateWithTime(value),
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            ellipsis: { showTitle: false },
            render: (value) => (
                <Tooltip placement="topLeft" title={value}>
                  {trimText(value)}
                </Tooltip>
              ),
        },    
        {
            title: 'To',
            dataIndex: 'mobile',
            key: "mobile",
            render: (value: string) => value
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: "status",
            render: (value) => (<Tag color={value === 'Success' ? "green" : "error"}>{value === "Success" ? "Delivered" : "Failed"}</Tag>),
            align: "center"
        },
      ];
          
  return (
    <Table
        {...tableProps}
        columns={columns}
        size={"small"}
        style={{ marginTop: "2rem" }}
        sticky={{ offsetHeader: 64 }}
    /> 
  )
}