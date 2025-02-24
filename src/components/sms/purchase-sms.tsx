import React from 'react';
import { Alert, Table, Typography, Card, Space, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { smsPackages } from '../../constants';
// import 'antd/dist/reset.css';

const { Title, Text } = Typography;

const MessagePricing = () => {
  const columns = [
    {
      title: 'Kifurushi',
      dataIndex: 'package',
      key: 'package',
    },
    {
      title: 'Bei',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Idadi ya SMS',
      dataIndex: 'smsCount',
      key: 'smsCount',
    },
    {
      title: 'Expiry Time',
      dataIndex: 'expiry',
      key: 'expiry',
    },
  ];

  return (
    <Card 
      style={{ 
        // maxWidth: '1200px', 
        margin: '20px auto',
        borderRadius: '8px',
      }}
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4} style={{ margin: 0 }}>Vifurushi Vya SMS</Title>
        </div>
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>       
        <div>
          <Title level={5}>Hatua za Kuijunga na Kifurushi</Title>
          <Text>Kulipia sawa na pendekezo hapo juu lipia kiasi kilichoainishwa kuendelea. Vinginevyo chagua kifurushi hapa chini.</Text>
          
          <ul style={{ marginTop: '16px' }}>
            <li>
              <Text>Chagua package yako kisha fanya malipo <span style={{fontWeight: "bold"}}>Airtel Money</span> kwa namba <span style={{fontWeight: "bold"}}>0689 255 545 (Charles Nkonoki)</span></Text>
            </li>
            <li>
              <Text>Tutumie ujumbe kwa njia ya Whatsapp au meseji ya kawaida ukitaja package uliyolipia na email yako unayotumia kuingia katika Mchango App. Tuma kwenye namba yetu ya hapo juu. 👆</Text>
            </li>
            <li>
              <Text>Utapokea taarifa SMS zako zikisha jazwa katika akauti yako.</Text>
            </li>
          </ul>
        </div>

        <Table
          columns={columns} 
          dataSource={smsPackages} 
          pagination={false}
          style={{ marginTop: '12px' }}
          size='small'
        />
      </Space>
    </Card>
  );
};

export default MessagePricing;