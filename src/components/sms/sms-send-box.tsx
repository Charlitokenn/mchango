import {useState} from 'react';
import {Button, Form, Input, Modal, Space, Statistic, Switch, Typography} from 'antd';
import {SendIcon} from "../icons";
import {sendDummySMS} from "../../utility/send-sms";
import {useCreateMany, useNotification, useOne} from "@refinedev/core";
import {messageStats} from "../../utility/message-stats";
import {supabaseClient} from "../../utility";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {MessageIcon} from "../icons";
import {AlertOutlined} from "@ant-design/icons";
import {createMessagePayload} from "../../utility/message-payload";
import { costPerMessage, messageTemplates } from '../../constants';
import MessageChat from './message-chat';
import MessagePricing from './purchase-sms';

const {TextArea} = Input
const {Text} = Typography

export const SMSBox = ({balance, userId, pledgerSelected, selectedPledgers, events}: {
    balance: number,
    userId: string,
    pledgerSelected: boolean,
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
    const [showPurchaseInfo, setShowPurchaseInfo] = useState(false)
    const [showCustomMessageInput, setShowCustomMessageInput] = useState(false)
      
    // Fetch user's current event
    const { data: currentEventDetails } = useOne({
        resource: "profiles",
        id: userId,
        meta: {
        select: `currentEvent`,
        },
    });

    const messagePayload = createMessagePayload(selectedPledgers, events);
    const previewMessage = messagePayload[0]?.message

    // const showModal = async () => {
    //     setIsLoading(true)
        
    //     const sendSMSPromises = messagePayload.map(async (sms) => {
    //         const { phoneNumbers, message } = sms;
        
    //         // Send the SMS and get the response
    //         const response = await sendDummySMS({ phoneNumbers, message });
    //         console.log(response)
    //         // Calculate stats for this batch of messages
    //         const stats = messageStats(response);
            
    //         // Ensure the returned stats are numbers
    //         if (isNaN(stats.totalMessages) || isNaN(stats.totalCost)) {
    //             console.error('Invalid stats:', stats);
    //             return { totalMessages: 0, totalCost: 0 };  // Return default values if invalid
    //         }
        
    //         return stats;
    //     });        
        
    //     // Wait for all promises to resolve
    //     const statsArray = await Promise.all(sendSMSPromises);

    //     // Sum up the total messages and cost after all promises have resolved
    //     const { totalMessages, totalCost } = statsArray.reduce(
    //         (acc, stats) => {
    //             acc.totalMessages += Number(stats.totalMessages);
    //             acc.totalCost += Number(stats.totalCost);
    //             return acc;
    //         },
    //         { totalMessages: 0, totalCost: 0 }
    //     );   

    //     // Calculate remaining balance after sending the SMS
    //     const smsBalance = balance - totalMessages;

    //     // Update state once after all calculations
    //     setIsLoading(false)
    //     setMessageCount(totalMessages);
    //     setMessageBalance(smsBalance);
    //     setOpenModal(true);
    // };

    const showModal = async () => {
        setIsLoading(true);
        
        // Create an array of promises for each SMS to send individually
        const sendSMSPromises = messagePayload.map(async (sms) => {
            const { phoneNumbers, message } = sms;
    
            // Map over phoneNumbers array and send each SMS individually
            const sendSingleSMSPromises = phoneNumbers.map(async (phoneNumber) => {
                const response = await sendDummySMS({ phoneNumbers: phoneNumber, message });
                console.log(response);
    
                // Calculate stats for this batch of messages
                const stats = messageStats(response);
                
                // Ensure the returned stats are numbers
                if (isNaN(stats.totalMessages) || isNaN(stats.totalCost)) {
                    console.error('Invalid stats:', stats);
                    return { totalMessages: 0, totalCost: 0 };  // Return default values if invalid
                }
                
                return stats;
            });
    
            // Wait for all individual SMS promises to resolve
            const statsArray = await Promise.all(sendSingleSMSPromises);
    
            // Sum up the total messages and cost from each SMS
            return statsArray.reduce(
                (acc, stats) => {
                    acc.totalMessages += Number(stats.totalMessages);
                    acc.totalCost += Number(stats.totalCost);
                    return acc;
                },
                { totalMessages: 0, totalCost: 0 }
            );
        });
    
        // Wait for all message batch promises to resolve
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
        setIsLoading(false);
        setMessageCount(totalMessages);
        setMessageBalance(smsBalance);
        setOpenModal(true);
    };
    

    const { mutate: addSentMessagesToSupabase } = useCreateMany({
        resource: "reports",
      });

    const handleOk = async () => {
        setConfirmModalLoading(true);

        // Initialize counters for total messages sent and overall cost
        let totalSentSMS = 0;
        let overallTotalCost = 0;
        const ATMessageResponseList: { messageId: string; number: string; statusCode: number; status: string; cost: number; relatedEvent: string; message: string; count: number }[] = [];

        // Use map to collect promises of asynchronous operations
        // const sendSMSPromises = messagePayload.map(async (sms) => {
        //     const { phoneNumbers, message } = sms;
        
        //     // Send the SMS and get the response
        //     // TO DO - Update DUMMY Func when going live
        //     const response = await sendDummySMS({ phoneNumbers, message });

        //     // Calculate stats for this batch of messages and update counters
        //     const { totalMessages, totalCost } = messageStats(response);
        //     totalSentSMS += totalMessages;
        //     overallTotalCost += totalCost;

        //     // Collect response messages for each sent message and append the current event id and message text
        //     const recipients = response.Recipients || [];
        //     recipients.forEach((recipient: { messageId: string; number: string; statusCode: number; status: string; cost: string; relatedEvent: string }) => {
        //         const costNumber = parseFloat(recipient.cost.replace('TZS ', ''));
        //         const messagesSent = costNumber / costPerMessage;
        //         ATMessageResponseList.push({
        //             messageId: recipient.messageId,
        //             number: recipient.number,
        //             statusCode: recipient.statusCode,
        //             status: recipient.status,
        //             cost: costNumber, // Convert cost to number
        //             relatedEvent: currentEventDetails?.data.currentEvent, // Add current event id
        //             message: message, // Add the corresponding message text
        //             count: messagesSent // Add the calculated number of messages sent
        //         });
        //     });
        // });

        const sendSMSPromises = messagePayload.map(async (sms) => {
            const { phoneNumbers, message } = sms;
        
            // Create an array of promises to send SMS to each individual phone number
            const sendSingleSMSPromises = phoneNumbers.map(async (phoneNumber) => {
                // Send the SMS and get the response for each phone number
                const response = await sendDummySMS({ phoneNumbers: phoneNumber, message });
        
                // Calculate stats for this batch of messages and update counters
                const { totalMessages, totalCost } = messageStats(response);
                totalSentSMS += totalMessages;
                overallTotalCost += totalCost;
        
                // Collect response messages for each sent message and append the current event id and message text
                const recipients = response.Recipients || [];
                recipients.forEach((recipient: {
                    messageId: string;
                    number: string;
                    statusCode: number;
                    status: string;
                    cost: string;
                    relatedEvent: string;
                }) => {
                    const costNumber = parseFloat(recipient.cost.replace('TZS ', ''));
                    const messagesSent = costNumber / costPerMessage;
                    ATMessageResponseList.push({
                        messageId: recipient.messageId,
                        number: recipient.number,
                        statusCode: recipient.statusCode,
                        status: recipient.status,
                        cost: costNumber, // Convert cost to number
                        relatedEvent: currentEventDetails?.data.currentEvent, // Add current event id
                        message: message, // Add the corresponding message text
                        count: messagesSent // Add the calculated number of messages sent
                    });
                });
            });
        
            // Wait for all individual SMS to be sent and processed
            await Promise.all(sendSingleSMSPromises);
        });
        
    
        // Wait for all promises to resolve
        await Promise.all(sendSMSPromises);

        // Calculate remaining balance after sending the SMS
        const smsBalance = balance - totalSentSMS;

        // Add sent messages to the database
        addSentMessagesToSupabase({
            values: ATMessageResponseList,
            meta: { notification: false }
        })

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
                <MessageChat sms={previewMessage} state={pledgerSelected} isCustomMessage={showCustomMessageInput}/>
                <Switch
                    checkedChildren="Write Own Message"
                    unCheckedChildren="Prefiled Message"
                    value={showCustomMessageInput}
                    size='small'
                    onChange={() => { showCustomMessageInput === true ? setShowCustomMessageInput(false) : setShowCustomMessageInput(true) }}
                />                
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
                <Button 
                    type="primary" 
                    icon={<SendIcon/>}
                    htmlType="submit" 
                    loading={isLoading} 
                    disabled={pledgerSelected} 
                    hidden={showCustomMessageInput}
                >{isLoading ? 'Calculating SMS': 'Send SMS'}</Button>
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
                        type="default"
                        onClick={() => {
                            setShowPurchaseInfo(false)
                        }}
                        hidden={showPurchaseInfo === true ? false : true}
                    >
                        Back
                    </Button>,                     
                    <Button
                        key="link"
                        type="primary"
                        onClick={() => {
                            setShowPurchaseInfo(true)
                        }}
                        hidden={messageCount < balance && showPurchaseInfo === false ? true : false}
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
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                  }}               
            >
                <div hidden={showPurchaseInfo}>
                    <Statistic 
                        title={`You are about to send`} 
                        value={messageCount} 
                        prefix={<MessageIcon/>} 
                        suffix={messageCount === 1 ? "Message" : " Messages"}
                    />
                    <Text 
                        style={{fontSize: "small", color: "orangered", fontStyle: "italic"}}
                        hidden={messageCount < balance}><AlertOutlined style={{color: "orangered"}}/> Insufficient SMS
                        Balance to send more messages</Text>
                    <DotLottieReact
                        src="https://lottie.host/c1bef571-8c0e-43e5-9afc-376eef6b5535/MmbtZYxEUu.lottie"
                        loop
                        autoplay
                    />
                </div>
                <div hidden={!showPurchaseInfo}>
                    <MessagePricing/>
                </div>
            </Modal>
        </>
    );
};