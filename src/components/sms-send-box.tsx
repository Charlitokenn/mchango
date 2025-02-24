import React, {useState} from 'react';
import {Button, Form, Input, Modal, Space, Statistic, Typography} from 'antd';
import {SendIcon} from "./icons";
import {sendDummySMS} from "../utility/send-sms";
import {useNotification} from "@refinedev/core";
import {messageStats} from "../utility/message-stats";
import {supabaseClient} from "../utility";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {MessageIcon} from "../components/icons";
import {AlertOutlined, HighlightOutlined} from "@ant-design/icons";
import {createMessagePayload} from "../utility/message-payload";
import { messageTemplates } from '../constants';
import MessageChat from './message-chat';

const {TextArea} = Input
const {Text, Paragraph} = Typography

export const SMSBox = ({balance, userId, stateCheck, selectedPledgers, events}: {
    balance: number,
    userId: string,
    stateCheck: boolean,
    selectedPledgers: any
    events: any
}) => {
    const {open: smsNotification} = useNotification();
    const [form] = Form.useForm();
    // const typedMessage = Form.useWatch('message-input', form);
    const [messagePreview, setMessagePreview] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmModalLoading, setConfirmModalLoading] = useState(false);
    const [messageCount, setMessageCount] = useState<number>(0)
    const [messageBalance, setMessageBalance] = useState<number>(0)

    const messagePayload = createMessagePayload(selectedPledgers, events);
    const previewMessage = messagePayload[0]?.message

    const showModal = async () => {
        setIsLoading(true)
        
        const sendSMSPromises = messagePayload.map(async (sms) => {
            const { phoneNumbers, message } = sms;
        
            // Send the SMS and get the response
            const response = await sendDummySMS({ phoneNumbers, message });
        
            // Calculate stats for this batch of messages
            const stats = messageStats(response);
            
            // Ensure the returned stats are numbers
            if (isNaN(stats.totalMessages) || isNaN(stats.totalCost)) {
                console.error('Invalid stats:', stats);
                return { totalMessages: 0, totalCost: 0 };  // Return default values if invalid
            }
        
            return stats;
        });        
        
        // Wait for all promises to resolve
        const statsArray = await Promise.all(sendSMSPromises);

        // Sum up the total messages and cost after all promises have resolved
        const { totalMessages, totalCost } = statsArray.reduce(
            (acc, stats) => {
                acc.totalMessages += Number(stats.totalMessages);
                acc.totalCost += Number(stats.totalCost);
                return acc;
            },
            { totalMessages: 0, totalCost: 0 }
        );   

        // Calculate remaining balance after sending the SMS
        const smsBalance = balance - totalMessages;

        // Update state once after all calculations
        setIsLoading(false)
        setMessageCount(totalMessages);
        setMessageBalance(smsBalance);
        setOpenModal(true);
    };

    const handleOk = async () => {
        setConfirmModalLoading(true);

        // Initialize counters for total messages sent and overall cost
        let totalSentSMS = 0;
        let overallTotalCost = 0;
    
        // Use map to collect promises of asynchronous operations
        const sendSMSPromises = messagePayload.map(async (sms) => {
            const { phoneNumbers, message } = sms;
    
            // Send the SMS and get the response
            // TO DO - Update DUMMY Func when going live
            const response = await sendDummySMS({ phoneNumbers, message });
    
            // Calculate stats for this batch of messages and update counters
            const { totalMessages, totalCost } = messageStats(response);
            totalSentSMS += totalMessages;
            overallTotalCost += totalCost;
        });
    
        // Wait for all promises to resolve
        await Promise.all(sendSMSPromises);
    
        // Calculate remaining balance after sending the SMS
        const smsBalance = balance - totalSentSMS;

        //Update database with new sms amounts
        await supabaseClient
            .from('profiles')
            .update({"smsBalance": smsBalance})
            .eq('id', userId)
            .select()

        smsNotification?.({
            type: "success",
            message: `Successfully sent ${totalSentSMS} SMS`,
            undoableTimeout: 5,
        });

        setOpenModal(false);
        setConfirmModalLoading(false);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    return (
        <>
        <Form
            layout="vertical"
            form={form}
            onFinish={showModal}
        >
            <Form.Item label="">
                <MessageChat sms={previewMessage} state={stateCheck}/>
                {/* <Paragraph 
                    // editable={{
                    //     icon: <HighlightOutlined />,
                    //     autoSize: true,
                    //     text: previewMessage
                    // }}
                >
                    <blockquote>Message Preview</blockquote>
                    <pre hidden={stateCheck ? true : false}>{previewMessage}</pre>
                </Paragraph> */}                
            </Form.Item>
            <Form.Item name="message-input" hidden>
                <TextArea
                    id="message-input-area"
                    rows={6}
                    placeholder="Write your message"
                    value={messagePreview}
                    onChange={(e) => setMessagePreview(e.target.value)}  // Update the state when the user types
                />
            </Form.Item>
            <Form.Item hidden>
                <Space wrap>
                    <p>Message Templates</p>
                    {messageTemplates.map((template) => (
                        <Button key={template.label} size="small" variant="dashed" onClick={() => {}}>
                            {template.label}
                        </Button>
                    ))}
                </Space>
            </Form.Item>

            <Form.Item>
                <Button type="primary" icon={<SendIcon/>} htmlType="submit" loading={isLoading} disabled={stateCheck}>{isLoading ? 'Calculating SMS': 'Send SMS'}</Button>
            </Form.Item>
        </Form>
            <Modal
                title=""
                open={openModal}
                onOk={handleOk}
                confirmLoading={confirmModalLoading}
                onCancel={handleCancel}
                okText="Confirm Send"
                okButtonProps={{disabled: messageCount > balance}}
                footer={[
                    <Button
                        key="link"
                        type="primary"
                        onClick={() => {
                            ""
                        }}
                        hidden={messageCount < balance}
                    >
                        Purchase More SMS
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={confirmModalLoading}
                        onClick={handleOk}
                        hidden={messageCount > balance}
                    >
                        {confirmModalLoading ? 'Sending SMS' : 'Confirm Send'}
                    </Button>,
                ]}
            >
                <Statistic title={`You are about to send`} value={messageCount} prefix={<MessageIcon/>}
                           suffix={messageCount === 1 ? "Message" : " Messages"}/>
                <Text style={{fontSize: "small", color: "orangered", fontStyle: "italic"}}
                      hidden={messageCount < balance}><AlertOutlined style={{color: "orangered"}}/> Insufficient SMS
                    Balance to send more messages</Text>
                <DotLottieReact
                    src="https://lottie.host/c1bef571-8c0e-43e5-9afc-376eef6b5535/MmbtZYxEUu.lottie"
                    loop
                    autoplay
                />
            </Modal>
        </>
    );
};