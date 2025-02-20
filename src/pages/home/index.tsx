import {Col, Progress, Row, Space} from "antd";
import DataCard from "../../components/card";
import PlotsEditableTable from "../../components/editableTable";
import {useList, useOne} from "@refinedev/core";
import { mkekaTextMessage } from "../../utility/mkeka-message";

export const Home = () => {  

  //Get user's current event and all their related events Data
  const {data: currentEvent, refetch: refetchCurrentEvent } = useList({
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

  const { data: pledges, isLoading: pledgesLoading, refetch: refetchPledgeSummary } = useList({
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

  const { data: collections, isLoading: collectionLoading, refetch: refetchCollectionSummary } = useList({
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
  const messageHeader = `Michango ya ${currentEventData?.data.eventType} ya ${currentEventData?.data.brideGroomNames}.\nUnaweza kupunguza au kumalizia mchango wako kupitia\n${currentEventData?.data.mobileNet}: ${currentEventData?.data.paymentMobile} - ${currentEventData?.data.namePaymentMobile}\n${currentEventData?.data.bank}: ${currentEventData?.data.bankAccountNumber} - ${currentEventData?.data.bankAccountName}\n\n 🅰️ - Ahadi\n ✅ - Amemaliza\n ☑️ - Amepunguza\n\n`
  const mkekaMessage = mkekaTextMessage(mkeka?.data)

  const eventObj = currentEvent?.data[0]
  
  const totalPledges = pledges?.data?.reduce((sum, { totalamount = 0 }) => sum + totalamount, 0) as number
  const totalCollections = collections?.data?.reduce((sum, { totalamount = 0 }) => sum + totalamount, 0) as number
  const currentEventBudgetAmount = eventObj?.events.find((event: { id: string }) => event.id === eventObj.currentEvent).budgetAmount
  const budgetShortFall = currentEventBudgetAmount - totalCollections

  return (
    <div>
      <Row gutter={[32, 32]} style={{marginBottom: "2rem"}}>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="horizontal" style={{display: "flex", justifyContent: "space-evenly"}}>
            <Space direction="vertical">
              <DataCard
                title="Bajeti"
                description="Kiasi cha bajeti"
                amount={currentEventBudgetAmount}
              />
              <DataCard
                title="Purngufu ya Bajeti"
                description="Kiasi kilichobakia kufikia bajeti"
                amount={budgetShortFall}
              />              
            </Space>
            <Progress 
              type="circle" 
              percent={Number((totalCollections / currentEventBudgetAmount * 100).toFixed(0))}
              size={[230, 230]}
              format={(percent) => (
                <Space direction="vertical">
                  <div >{percent}%</div>
                  <div style={{fontSize: "medium"}}>To Meet Budget</div>
                </Space>
              )}
            />
          </Space>
        </Col>
        <Col xs={24} sm={24} xl={12}>
          <Space direction="horizontal" style={{display: "flex", justifyContent: "space-evenly"}}>
            <Space direction="vertical">
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
              type="circle" 
              percent={Number((totalCollections / totalPledges * 100).toFixed(0))}
              size={[230, 230]}
              format={(percent) => (
                <Space direction="vertical">
                  <div >{percent}%</div>
                  <div style={{fontSize: "medium"}}>Collected Pledges</div>
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


