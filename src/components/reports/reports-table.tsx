import { useTable } from '@refinedev/antd';
import { useGetIdentity, useOne } from '@refinedev/core';
import { Table, TableColumnsType, Tag, Tooltip } from 'antd'
import { formatDateWithTime } from '../../utility/date-formater';
import { addSpaceToCamelCase, trimText } from '../../utility/propercase';
import { SyncOutlined } from '@ant-design/icons';

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
            dataIndex: 'number',
            key: "number",
            render: (value: string) => value
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: "status",
          render: (value) => (<Tag color={value === 'Success' ? "green" : "error"}>{value === "Success" ? "Sent" : addSpaceToCamelCase(value)}</Tag>),
          align: "center",
      },
        // {
        //     title: 'Delivery Status',
        //     dataIndex: 'delivery_status',
        //     key: "delivery_status",
        //     render: (value) => (
        //       <Tag 
        //         color={value === 'Success' ? "green" : value === null ? "default" : "error"} 
        //         icon={value === null ? <SyncOutlined spin />:""}
        //       >
        //         {value === "Success" ? "Delivered" : value === null ? "Pending Delivery" : "Failed"}
        //       </Tag>),
        //     align: "center",
        // },
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