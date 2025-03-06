import { Create } from "@refinedev/antd"
import { Row, Col, Image, Form, Input, InputNumber, Space, Select, DatePicker, Typography, Divider } from "antd"
import { banks, eventTypes, mobileNetworks } from "../../constants"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"


type Props = {
    formProps: any,
    saveButtonProps: any
}

const { Paragraph,Title } = Typography;

export const EventForm = ({formProps, saveButtonProps}: Props) => {
 return (
    <Create                   
        saveButtonProps={saveButtonProps}
        headerButtons={() => (<></>)}
        goBack={false}
        contentProps={{
        style: {
            padding: "0px",
            boxShadow: "none",
        },
        }}
        title={false}
        footerButtons={() => (<></>)}
    >
      <Form {...formProps} layout="vertical">
        <Row gutter={[32, 32]}>
            <Col xs={24} sm={24} xl={12} style={{ height: "100%" }}>
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
                    <Form.Item
                        name="eventDate"
                        label="Date of The Event"
                        rules={[{ required: true, message: "Tafadhali weka jina" }]}
                        >
                        <DatePicker format={"MMMM DD, YYYY"} style={{ width: "100%" }} />
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
                            <Input placeholder="e.g. 0712001002" />
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
      </Form>
      </Create>
 )
}