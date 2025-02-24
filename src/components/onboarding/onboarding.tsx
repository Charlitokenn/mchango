import React, { useState } from 'react';
import { Button, Modal, Steps, theme } from 'antd';
import { useGetIdentity, useOne, useUpdate } from '@refinedev/core';
import { Welcome } from './welcome';
import { EventForm } from './event-form';
import { useForm } from '@refinedev/antd';

const OnboardingModalWizard: React.FC = () => {
  const {data: identity} = useGetIdentity();
  const userId = (identity as {id: string})?.id
  const {data: onboardingCheck } = useOne({
    resource: "profiles",
    id: userId,
    meta: {
      select: `onBoarding`
    }
  })

  const { formProps: updateProfileFormProps, saveButtonProps: updateProfileSaveButtonProps } = useForm({
    resource: "profiles",
    action: "edit",
    id: userId,    
  })

  const { formProps: createEventFormProps, saveButtonProps: createEventSaveButtonProps } = useForm({
    resource: "events",
    action: "create",
    onMutationSuccess: (data) => {
      if (data.data.id) {
        updateProfile({
          values: {
            onBoarding: "true",
            currentEvent: data?.data.id
          }
        })
      }
    }
  })


  const {mutate: updateProfile} = useUpdate({
    resource: "profiles",
    id: userId,
  })

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'Welcome',
      content: <Welcome formProps={updateProfileFormProps} saveButtonProps={updateProfileSaveButtonProps}/>,
    },
    {
      title: 'First Event',
      content: <EventForm formProps={createEventFormProps} saveButtonProps={createEventSaveButtonProps}/>
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none", //`1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
        <Modal open={!onboardingCheck?.data.onBoarding} footer={null} closable={false} width="100%">
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
                {current < steps.length - 1 && (
                <Button type="primary" 
                  {...updateProfileSaveButtonProps} 
                  onClick={async (e) => {
                    try {
                      // Manually trigger form validation
                      await updateProfileFormProps.form?.validateFields();
                      
                      // Call the original save function
                      if (updateProfileSaveButtonProps.onClick) {
                        await updateProfileSaveButtonProps.onClick(e);
                      }
                
                      // Proceed to the next step only if validation & saving succeed
                      next();
                    } catch (error) {
                      console.error("Validation failed:", error);
                    }
                  }}>
                    Add Event Details
                </Button>
                )}
                {current === steps.length - 1 && (
                <Button type="primary" 
                  {...createEventSaveButtonProps}                
                >
                  Complete Onboarding
                </Button>
                )}
            </div>
        </Modal>
    </>
  );
};

export default OnboardingModalWizard;