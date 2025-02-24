import { Row, Col, Form, Input, Space, DatePicker, Divider,InputNumber, Select, Typography } from "antd";
import { banks, eventTypes, mobileNetworks } from "../../constants";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Edit, useForm,  } from "@refinedev/antd";
import { useGetIdentity, useOne, useSelect } from "@refinedev/core";
import { useEffect, useState } from "react";
import { toProperCase } from "../../utility/propercase";
import { convertToDayjs, formatDate } from "../../utility/date-formater";
import dayjs, { Dayjs } from "dayjs";

const {Title, Paragraph} = Typography

export const Events = () => {
    const [eventName, setEventName] = useState<string | undefined>(undefined);
    const { data: identity } = useGetIdentity();
    const userId = (identity as { id: string })?.id;
  
    // Fetch user's current event
    const { data: currentEventDetails } = useOne({
      resource: "profiles",
      id: userId,
      meta: {
        select: `events!profiles_currentEvent_fkey(*)`,
      },
    });
  
    // Set eventName when data is available
    useEffect(() => {
      const eventId = currentEventDetails?.data?.events?.id;
      if (eventId && !eventName) {
        setEventName(eventId);
      }
    }, [currentEventDetails?.data?.events, eventName]);
    
    // Ensure useForm is only used when eventName is available
    const { formProps, saveButtonProps } = useForm({
      resource: "events",
      action: "edit",
      id: eventName, // This will be `undefined` initially, so `useForm` won't fetch data until it's set
      queryOptions: { enabled: !!eventName }, // Prevents execution when eventName is undefined
    });
  
    // Fetch all events added by the user
    const { options: events } = useSelect<{
      id: string;
      eventType: string;
      brideGroomNames: string;
      eventDate: Date;
    }>({
      resource: "events",
      optionLabel: (item) => `${toProperCase(item.eventType)} ya ${item.brideGroomNames} - ${formatDate(item.eventDate)}`,
      optionValue: "id",
      filters: [{ field: "addedBy", operator: "eq", value: userId }],
      liveMode: "auto",
      meta: { select: `id, brideGroomNames, eventType, addedBy, eventDate` },
    });
  
    return (
      <Form 
        key={eventName} 
        {...formProps} 
        layout="vertical"
        >
          <Edit
            saveButtonProps={saveButtonProps}
            headerButtons={() => (<></>)}
            contentProps={{
                style: {
                  padding: "0px",
                  boxShadow: "none",
                },
              }}
            title={false}
            recordItemId={eventName}
          >
            <Row gutter={[32, 32]}>
                <Col xs={24} sm={24} xl={12} style={{ height: "100%" }}>
                  <Select options={events} style={{width: "100%"}} placeholder="Select Event" onChange={(value) => setEventName(value)}/>
                    <DotLottieReact
                        src="https://lottie.host/c67e2543-0335-4b71-b0bf-196493cf0c03/y8qD0UZ1QY.lottie"
                        loop
                        autoplay
                    />
                </Col>            
                <Col xs={24} sm={24} xl={12} style={{ height: "100%" }}>
                    <Paragraph style={{ textAlign: "left" }}>
                        <blockquote><Title level={4}>Event Details</Title></blockquote>
                    </Paragraph>
                    <Divider style={{marginTop: "-0.2rem"}}/>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="eventType"
                            label="Type of Event"
                            rules={[{ required: true, message: "Chagua nchi" }]}
                            >
                            <Select
                                placeholder="Event Type"
                                options={eventTypes}
                                optionRender={(option) => (
                                    <Space>
                                        {option.data.icon}
                                        {/* {option.data.country} */}
                                        <span style={{ fontSize: 14 }}>{option.data.label}</span>
                                    </Space>
                                )}
                                style={{ textAlign: "left" }}
                            />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                        //Fix Displayin the event date in the form
                        <Form.Item
                            name="eventsDate"
                            label="Date of The Event"
                            rules={[{ required: false, message: "Tafadhali chagua tarehe" }]}
                            >
                            <DatePicker 
                                format={"MMMM DD, YYYY"} 
                                style={{ width: "100%" }}
                                value={convertToDayjs(currentEventDetails?.data?.events?.eventDate)}
                            />
                            </Form.Item>
                        </Col>
                    </Row>          
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="brideGroomNames"
                                label="Name of Bride / Groom"
                                rules={[{ required: true, message: "Tafadhali weka jina" }]}
                            >
                                <Input />
                            </Form.Item>            
                        </Col>
                        <Col span={12}>
                        <Form.Item
                            name="budgetAmount"
                            label="Event Budget"
                            rules={[{ required: true, message: "Insert Event Budget" }]}
                        >
                            <InputNumber
                                addonBefore="Tshs."
                                formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                }
                                parser={(value) =>
                                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                                }
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Paragraph style={{ textAlign: "left" }}>
                        <blockquote><Title level={4}>Collection Accounts</Title></blockquote>
                    </Paragraph>
                    <Divider style={{marginTop: "-0.2rem"}}/>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="mobileNet"
                                label="Mobile Network"
                                rules={[{ required: false, message: "Select Network" }]}
                            >
                            <Select
                                placeholder="Mobile Money Network"
                                options={mobileNetworks}
                                optionRender={(option) => (
                                    <Space>
                                        {option.data.icon}
                                        <span style={{ fontSize: 14 }}>{option.data.label}</span>
                                    </Space>
                                )}
                                style={{ textAlign: "left" }}
                            />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="paymentMobile"
                                label="Mobile Number"
                                rules={[{ required: false, message: "Input Mobile Number" }]}
                            >
                                <Input placeholder="e.g. 0712001002" count={{max: 10, exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),}}   />
                            </Form.Item>  
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="namePaymentMobile"
                                label="Name"
                                rules={[{ required: false, message: "Input Mobile Number's Name" }]}
                            >
                                <Input placeholder="Name on Mobile Money"/>
                            </Form.Item>  
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                name="bank"
                                label="Bank Name"
                                rules={[{ required: false, message: "Select Bank" }]}
                            >
                            <Select
                                placeholder="Select Bank's Name"
                                options={banks}
                                optionRender={(option) => (
                                    <Space>
                                        {option.data.icon}
                                        <span style={{ fontSize: 14 }}>{option.data.label}</span>
                                    </Space>
                                )}
                                style={{ textAlign: "left" }}
                            />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="bankAccountNumber"
                                label="Account Number"
                                rules={[{ required: false, message: "Add Bank Account Number" }]}
                            >
                                <Input 
                                    placeholder="Account Number" 
                                    count={{max: 15, exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),}}                                
                                />
                            </Form.Item>  
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="bankAccountName"
                                label="Account Name"
                                rules={[{ required: false, message: "Add Bank Account Name" }]}
                            >
                                <Input placeholder="Name on Bank Account"/>
                            </Form.Item>  
                        </Col>
                    </Row>                 
                </Col>
            </Row>
          </Edit>
      </Form>
    );
  };
  