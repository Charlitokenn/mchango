import { Row, Col, Image, Divider, Form, Input, InputNumber, Select, Space, theme, Typography } from "antd"
import { countryCodes } from "../../constants"
import { Edit} from "@refinedev/antd"

type Props = {
   formProps: any,
   saveButtonProps: any
}

const {Title, Paragraph} = Typography

export const Welcome = ({formProps, saveButtonProps}: Props) => {

 return (
         <Row gutter={[32, 32]} style={{ marginTop: "32px"}}>
            <Col xs={24} sm={24} xl={16} style={{ height: "100%" }}>
               <Image src="https://cdn.dribbble.com/users/1418633/screenshots/5400267/hilady_dribbble_studiotale.gif" preview={false}/>
               <Paragraph>Inaonekana ni mara yako ya kwanza kujiunga na <span style={{fontWeight: "bold", color: "purple", fontStyle: "italic"}}>Mchango App</span>. Tunaomba ujaze taarifa zako ili tuweze kukuhudumia vizuri.</Paragraph>
            </Col>
            <Col xs={24} sm={24} xl={8} style={{ height: "100%"}}>
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
                  footerButtons={() => (<></>)}
               >
                  <Form
                     {...formProps}
                     layout="vertical"
                  >
                     <Title style={{marginBottom: "2rem"}}>Karibu Sana!</Title>
                     <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="firstName"
                           label="Jina la Kwanza"
                           rules={[{ required: true, message: "Tafadhali weka jina" }]}
                        >
                           <Input />
                        </Form.Item>            
                     </Col>
                     <Col span={12}>
                        <Form.Item
                           name="lastName"
                           label="Jina la Ukoo"
                           rules={[
                           { required: false, message: "Tafadhali weka jina la ukoo" },
                           ]}
                        >
                           <Input />
                        </Form.Item>
                     </Col>
                     </Row>
                     <Row gutter={16}>
                     <Col span={12}>
                        <Form.Item
                           name="countryCode"
                           label="Nchi"
                           rules={[{ required: true, message: "Chagua nchi" }]}
                        >
                           <Select
                           placeholder="Country Code"
                           options={countryCodes}
                           optionRender={(option) => (
                              <Space>
                                 {option.data.flag}
                                 {option.data.country}
                                 <span style={{ fontSize: 11 }}>{option.data.value}</span>
                              </Space>
                           )}
                           />
                        </Form.Item>
                     </Col>
                     <Col span={12}>
                        <Form.Item
                           name="mobile"
                           label="Namba ya Simu"
                           rules={[{ required: true, message: "Namba ya Simu" }]}
                        >
                           <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                     </Col>
                     </Row>
                  </Form>
               </Edit>         
            </Col>
         </Row>
 )
}