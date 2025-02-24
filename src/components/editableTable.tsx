import {
  DeleteButton,
  useModalForm} from "@refinedev/antd";
import {
  List,
  Table,
  Space,
  Form,
  Button,
  Input,
  InputNumber,
  Card,
  Dropdown,
  MenuProps,
  Flex,
  Modal,
  Row,
  Col,
  Select,
  Divider,
  DatePicker,
  Spin,
  TableColumnsType,
} from "antd";
import { DeleteIcon, DotsIcon, EditIcon } from "./icons";
import { currencyNumber } from "../utility/currency-numbers";
import { Text } from "./text";
import { useState } from "react";
import { countryCodes } from "../constants";
import { useList, useSelect } from "@refinedev/core";
import { MkekaModal } from "./mkeka-modal";

interface PlotsEditableTableProps {
  initialFilterValue: string;
  mkekaMessage: any,
  messageHeader: any
  refetchCollectionSummary: () => void
  refetchPledgeSummary: () => void
  refetchWAMkekaSummary: () => void
}

const PlotsEditableTable = ({
  children,
  initialFilterValue,
  mkekaMessage,
  messageHeader,
  refetchCollectionSummary,
  refetchPledgeSummary,
  refetchWAMkekaSummary
}: React.PropsWithChildren<PlotsEditableTableProps>) => {

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openMkekaShareModal, setOpenMkekaShareModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(initialFilterValue)

  const {
    modalProps: createPledgerModalProps,
    formProps: createPledgerFormProps,
    show: createPledgerModalShow,
  } = useModalForm({
    resource: "pledgers",
    action: "create",
    warnWhenUnsavedChanges: true,
    onMutationSuccess: () => {
      refetchPledgeSummary();
      refetchCollectionSummary();
      refetchWAMkekaSummary();
      refetchMkeka()
  }
  });

  const {
    modalProps: createMchangoModalProps,
    formProps: createMchangoFormProps,
    show: createMchangoModalShow,
  } = useModalForm({
    resource: "collections",
    action: "create",
    warnWhenUnsavedChanges: true,
    onMutationSuccess: () => {
      refetchPledgeSummary();
      refetchCollectionSummary();
      refetchWAMkekaSummary();
      refetchMkeka()
  }
  });  

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm({
    resource: "pledgers",
    action: "edit",
    warnWhenUnsavedChanges: true,
    onMutationSuccess: () => {
      refetchPledgeSummary();
      refetchCollectionSummary();
      refetchWAMkekaSummary();
      refetchMkeka()
  }
  });

  const showShareMkekaModal = () => {
    setOpenMkekaShareModal(true);
  };

  const closeShareMkekaModal = () => {
    setOpenMkekaShareModal(false);
  };  

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type="link" color="default" variant="link" onClick={showShareMkekaModal}>Share Mkeka</Button>
      ),
    },
  ];

  const { options: pledgers } = useSelect<{
    firstName?: string;
    lastName: string;
    mobile: string;
  }>({
    resource: "mkeka",
    optionLabel: (item) => `${item.firstName} ${item.lastName}`,
    optionValue: "mobile",
    sorters: [
      {
        field: "firstName",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "relatedEvent",
        operator: "eq",
        value: initialFilterValue,
      },
      {
        field: "balance",
        operator: "gt",
        value: 0,
      },
    ],
  });

  const { data: mkeka, refetch: refetchMkeka}  = useList({
    resource: 'mkeka',
    liveMode: "auto",
    sorters: [
        {
          field: "firstName",
          order: "asc",
        },
      ],
    pagination: {
      pageSize: 10000,
    },
    filters: [
      {
        field: "relatedEvent",
        operator: "eq",
        value: initialFilterValue
      },
    ],
  })

  const columns: TableColumnsType = [
    {
        title: 'Full Name',
        key: 'fullName',
        render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
        title: 'Mobile',
        key: 'mobile',
        render: (_, record) => `${record.countryCode}${record.mobile}`,
    },    
    {
        title: 'Ahadi',
        dataIndex: 'amount',
        key: "amount",
        render: (value: number) => currencyNumber(value)
    },
    {
        title: 'Iliyolipwa',
        dataIndex: 'paid',
        key: "paid",
        render: (value: number) => currencyNumber(value)
    },
    {
        title: 'Iliyobakia',
        dataIndex: 'balance',
        key: "balance",
        render: (value: number) => currencyNumber(value)
    },
    {
      key: "actions",
      render: (record: any) => (
        <Space.Compact>
          <Button icon={<EditIcon />} size="small" onClick={() => editModalShow(record.id)} />
          <DeleteButton 
            resource="pledgers" 
            recordItemId={record.id}
            hideText={true}
            size="small"
            icon={<DeleteIcon />}
            confirmTitle={`Are you sure to delete ${record.firstName}'s pledge?` }
            confirmOkText="Yes, Delete"
            confirmCancelText="No"
            onSuccess={() => {
              refetchCollectionSummary()
              refetchPledgeSummary()
              refetchWAMkekaSummary()
              refetchMkeka()
            }}
          />
      </Space.Compact>
      ),
      width: 45,
    }
  ];

  return (
    <>
      <Card>
        <List>
          <Form>
            <Flex justify="space-between">
              <Text size="lg">Mkeka Wangu</Text>
              <Space direction="horizontal">
                <Button variant="outlined" onClick={() => createPledgerModalShow()}>
                  Rekodi Ahadi
                </Button>
                <Button variant="outlined" onClick={() => createMchangoModalShow()}>
                  Rekodi Mchango
                </Button>
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <Button icon={<DotsIcon />} />
                </Dropdown>
              </Space>
            </Flex>
            <Table
                columns={columns}
                size={"small"}
                dataSource={mkeka?.data}
                style={{ marginTop: "2rem" }}
            />           
          </Form>
        </List>
        {children}{" "}
      </Card>

      <Modal {...createPledgerModalProps} title="Ahadi Mpya">
        <Spin spinning={confirmLoading}>
          <Form
            {...createPledgerFormProps}
            layout="vertical"
          >
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="Jina la Kwanza"
                  rules={[{ required: true, message: "Tafadhali weka jina" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="relatedEvent"
                  rules={[{ required: true, message: "Missing Related Event Id" }]}
                  initialValue={currentEvent}
                  hidden
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
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name="pledge"
                  label="Kiasi Cha Ahadi"
                  rules={[{ required: true, message: "Tafadhali weka Ahadi" }]}
                >
                  <InputNumber
                    addonBefore="Tshs."
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) =>
                      value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                    }
                    style={{ width: "152%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>

      <Modal {...createMchangoModalProps} title="Mchango Mpya">
        <Spin spinning={confirmLoading}>
          <Form
            {...createMchangoFormProps}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="date"
                  label="Tarehe"
                  rules={[{ required: true, message: "Tafadhali weka tarehe" }]}
                >
                  <DatePicker format={"MMM DD, YYYY"} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  name="relatedEvent"
                  rules={[{ required: true, message: "Missing Related Event Id" }]}
                  initialValue={currentEvent}
                  hidden
                >
                  <Input />
                </Form.Item> 
              </Col>
              <Col span={12}>
                <Form.Item
                  name="mobile"
                  label="Mtoa Ahadi"
                  rules={[{ required: true, message: "Chagua Mtoa Ahadi" }]}
                >
                  <Select
                    options={pledgers}
                    showSearch
                    optionFilterProp="label"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name="amount"
                  label="Kiasi Cha Ahadi"
                  rules={[{ required: true, message: "Tafadhali weka Ahadi" }]}
                >
                  <InputNumber
                    addonBefore="Tshs."
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) =>
                      value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                    }
                    style={{ width: "152%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>

      <Modal {...editModalProps}>
        <Form
          {...editFormProps}
          layout="vertical"
        >
          <Divider />
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
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="pledge"
                label="Kiasi Cha Ahadi"
                rules={[{ required: true, message: "Tafadhali weka Ahadi" }]}
              >
                <InputNumber
                  addonBefore="Tshs."
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                  style={{ width: "152%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <MkekaModal 
        sharedMkekaText={mkekaMessage}
        messageHeader={messageHeader}
        isVisible={openMkekaShareModal}
        closeModal={closeShareMkekaModal}
      />
    </>
  );
};

export default PlotsEditableTable;
