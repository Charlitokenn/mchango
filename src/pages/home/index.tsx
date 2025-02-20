import {Col, Progress, Row, Space} from "antd";
import DataCard from "../../components/card";
import PlotsEditableTable from "../../components/editableTable";
import {useList, useOne} from "@refinedev/core";
import { mkekaTextMessage } from "../../utility/mkeka-message";

type Event = {
  id: string;
  eventType: string;
  brideGroomNames: string;
  paymentMobile: string;
  namePaymentMobile: string;
  bank: string;
  bankAccountNumber: string;
  bankAccountName: string;
  mobileNet: string;
  addedBy: string;
  budgetAmount: number;
};

type EventWrapper = {
  currentEvent: string 
  events: Event[];
};

type Pledgers = {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  amount: number;
  paid: number;
  balance: number;
  countryCode: string;
  relatedEvent: string;
}[]

export const Home = () => {  

  //Get user's current event and all their related events Data
  const {data: currentEvent } = useList({
    resource: "profiles",
    meta: {
        select: `currentEvent,events!events_addedBy_fkey(id,budgetAmount)`,
    },
  })


  const currentEventId = currentEvent?.data[0].currentEvent

  const {data: currentEventData} = useOne({
    resource: "events",
    id: currentEventId
  })

  const { data: pledges, refetch: refetchPledgeSummary } = useList({
    resource: "pledges_summary",
    liveMode: "auto",
    meta: {
      select: `totalamount`,
    },
    filters: [
      {
        field: "relatedEvent",
        operator: "eq",
        value: currentEventId,
      }
    ]    
  });

  const { data: collections, refetch: refetchCollectionSummary } = useList({
    resource: "collections_summary",
    liveMode: "auto",
    meta: {
      select: `totalamount`,
    },
    filters: [
      {
        field: "relatedEvent",
        operator: "eq",
        value: currentEventId,
      }
    ]
  });

  const {data: mkeka} = useList({
    resource: "mkeka",
    liveMode: "auto",
    meta: {
      select: `*`
    },
    pagination: {
      pageSize: 10000
    },
    filters: [
      {
        field: "relatedEvent",
        operator: "eq",
        value: currentEventId,
      }
    ]
  })

  const messageHeader = `Michango ya ${currentEventData?.data?.eventType ? currentEventData.data.eventType : 'harusi'} ya ${currentEventData?.data?.brideGroomNames ? currentEventData.data.brideGroomNames : 'unknown'}.\nUnaweza kupunguza au kumalizia mchango wako kupitia\n${currentEventData?.data?.mobileNet ? currentEventData.data.mobileNet : 'mobile network not provided'}: ${currentEventData?.data?.paymentMobile ? currentEventData.data.paymentMobile : 'payment mobile not provided'} - ${currentEventData?.data?.namePaymentMobile ? currentEventData.data.namePaymentMobile : 'payment mobile name not provided'}\n${currentEventData?.data?.bank ? currentEventData.data.bank : 'bank not provided'}: ${currentEventData?.data?.bankAccountNumber ? currentEventData.data.bankAccountNumber : 'bank account number not provided'} - ${currentEventData?.data?.bankAccountName ? currentEventData.data.bankAccountName : 'bank account name not provided'}\n\n 🅰️ - Ahadi\n ✅ - Amemaliza\n ☑️ - Amepunguza\n\n`;
  const mkekaMessage = mkekaTextMessage(mkeka?.data)

  const eventObj = currentEvent?.data?.[0] as EventWrapper ?? { currentEvent: '', events: [] };
  
  const totalPledges = pledges?.data?.reduce((sum, { totalamount = 0 }) => sum + totalamount, 0) as number
  const totalCollections = collections?.data?.reduce((sum, { totalamount = 0 }) => sum + totalamount, 0) as number
  const currentEventBudgetAmount = eventObj?.events.find((event: { id: string }) => event.id === eventObj.currentEvent)?.budgetAmount ?? 0
  const budgetShortFall = currentEventBudgetAmount - totalCollections

  return (
    <div>
      <Row gutter={[32, 32]} style={{marginBottom: "2rem"}}>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="vertical" style={{display: "flex" }}>
            <Space style={{ display: "flex", width: "100%", justifyContent: "space-between"}}>
              <DataCard
                title="Bajeti"
                description="Kiasi cha bajeti"
                amount={currentEventBudgetAmount}
              />
              <DataCard
                title="Pungufu ya Bajeti"
                description="Kiasi kilichobakia kufikia bajeti"
                amount={budgetShortFall}
              />      
            </Space>
            <Progress 
                percent={Number((totalCollections / currentEventBudgetAmount * 100).toFixed(0))}
                percentPosition={{ align: 'end', type: 'outer' }}
                format={(percent) => (
                  <Space direction="horizontal">
                    <div >{percent}%</div>
                    <span style={{fontSize: "small"}}>To Budget</span>
                  </Space>
                )}
            /> 
          </Space>
        </Col>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="vertical" style={{display: "flex"}}>
            <Space direction="horizontal" style={{ display: "flex", width: "100%", justifyContent: "space-between"}}>
              <DataCard
                  title="Ahadi"
                  description="Jumla ya Ahadi"
                  amount={totalPledges}
              />
              <DataCard
                  title="Ahadi Zilizolipwa"
                  description="Jumla ya Ahadi Zilizolipwa"
                  amount={totalCollections}
              />
            </Space>
            <Progress 
              percent={Number((totalCollections / totalPledges * 100).toFixed(0))}
              format={(percent) => (
                <Space direction="horizontal">
                  <div >{percent}%</div>
                  <span style={{fontSize: "small"}}>Collected Pledges</span>
                </Space>
              )}
            />            
          </Space>
        </Col>
      </Row>
      <PlotsEditableTable 
        initialFilterValue={currentEventId} 
        mkekaMessage={mkekaMessage}
        messageHeader={messageHeader}
        refetchCollectionSummary={refetchCollectionSummary}
        refetchPledgeSummary={refetchPledgeSummary}
      />
      {/* <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={24} style={{ height: "100%" }}></Col>
      </Row> */}      
    </div>
  );
};


