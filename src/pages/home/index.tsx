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

  const {data: mkeka, refetch: refetchMkeka} = useList({
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
  // const mkekaMessage = mkekaTextMessage(mkeka?.data ?? []);
  const mkekaMessage = mkekaTextMessage(
    (mkeka?.data ?? []).map((item) => ({
      id: Number(item.id), // Ensure `id` is a number
      firstName: item.firstName ?? "", // Provide defaults for missing fields
      lastName: item.lastName ?? "",
      mobile: item.mobile ?? "",
      amount: Number(item.amount ?? 0),
      paid: Number(item.paid ?? 0),
      balance: Number(item.balance ?? 0),
      countryCode: item.countryCode ?? "",
      relatedEvent: item.relatedEvent ?? "",
    }))
  );

  const eventObj = currentEvent?.data?.[0] as EventWrapper ?? { currentEvent: '', events: [] };
  
  const totalPledges = pledges?.data?.reduce((sum, { totalamount = 0 }) => sum + totalamount, 0) as number
  const totalCollections = collections?.data?.reduce((sum, { totalamount = 0 }) => sum + totalamount, 0) as number
  const currentEventBudgetAmount = eventObj?.events.find((event: { id: string }) => event.id === eventObj.currentEvent)?.budgetAmount ?? 0
  const budgetShortFall = currentEventBudgetAmount - totalCollections

  return (
    <div>
      <Row gutter={[32, 32]} style={{marginBottom: "2rem"}}>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="vertical" style={{ display: "flex", width: "100%" }}>
            <Row gutter={16} style={{ width: "100%" }}>
              <Col span={12}>
                <DataCard
                  title="Bajeti"
                  description="Kiasi cha bajeti"
                  amount={currentEventBudgetAmount}
                />
              </Col>
              <Col span={12}>
                <DataCard
                  title="Pungufu ya Bajeti"
                  description="Kiasi cha kufikia bajeti"
                  amount={budgetShortFall}
                />
              </Col>
            </Row>
            <Progress 
              percent={Number((totalCollections / currentEventBudgetAmount * 100).toFixed(0))}
              percentPosition={{ align: 'end', type: 'outer' }}
              format={(percent) => (
                <Space direction="horizontal">
                  <div>{percent}%</div>
                  <span style={{ fontSize: "small" }}>To Budget</span>
                </Space>
              )}
              style={{ paddingRight: "1rem" }}
            />
          </Space>
        </Col>

        <Col xs={24} sm={24} xl={12}>
          <Space direction="vertical" style={{ display: "flex", width: "100%" }}>
            <Row gutter={16} style={{ width: "100%" }}>
              <Col span={12}>
                <DataCard
                  title="Ahadi"
                  description="Jumla ya Ahadi"
                  amount={totalPledges}
                />
              </Col>
              <Col span={12}>
                <DataCard
                  title="Ahadi Zilizolipwa"
                  description="Jumla ya Ahadi Zilizolipwa"
                  amount={totalCollections}
                />
              </Col>
            </Row>
            <Progress 
              percent={Number((totalCollections / totalPledges * 100).toFixed(0))}
              format={(percent) => (
                <Space direction="horizontal">
                  <div>{percent}%</div>
                  <span style={{ fontSize: "small" }}>Collected Pledges</span>
                </Space>
              )}
              style={{ paddingRight: "1rem" }}
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
        refetchWAMkekaSummary={refetchMkeka}
      />
      {/* <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} sm={24} xl={24} style={{ height: "100%" }}></Col>
      </Row> */}      
    </div>
  );
};


