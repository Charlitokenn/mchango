import { KEFlag, TZFlag, UGFlag } from "../components";

export const countryCodes = [
  {
    label: "+255 Tanzania",
    value: "+255",
    flag: <TZFlag />,
    country: "Tanzania",
  },
  {
    label: "+254 Kenya",
    value: "+254",
    flag: <KEFlag />,
    country: "Kenya",
  },
  {
    label: "+256 Uganda",
    value: "+256",
    flag: <UGFlag />,
    country: "Uganda",
  },
];

export const costPerMessage = 35

export const messageTemplates = [
  {
    label: "Unfinished Pledges",
    value: `Habari {firstName},\n Asante kwa ahadi yako ya {ahadi}. Tunapenda kukukumbusha kumalizia ahadi yako iliyobakia ya {deni}.`
  },
  {
    label: "Finished Pledges",
    value: `Habari {firstName},\n Asante kwa kumaliza kulipia ahadi yako ya {ahadi}.` 
  },
  {
    label: "SMS 1",
    value: `Habari {firstName},\nKamati ya {eventType} ya ndugu na rafiki yetu, {groomBride} itakayofanyika tarehe {eventDate} inapenda kukukumbusha kumalizia au kupunguza mchango wako wa {deni}.\nWewe ni wa muhimu katika kufanikisha shughuli hii. Mungu akubariki.\n{mobile}: {mobileNumber} - {mobileName}\n{bank}: {bankAccount} - {bankName}.\nAhsante sana.`
  },
  {
    label:"SMS 2",
    value: `Habari {firstName},\nKamati ya {eventType} ya ndugu na rafiki yetu, {groomBride} itakayofanyika tarehe {eventDate} inapenda kukukumbusha kumalizia au kupunguza mchango wako wa {deni}.\nTumebaki na siku {daysToEvent} tu mpaka siku ya {eventType}.\nWewe ni wa muhimu katika kufanikisha shughuli hii. Mungu akubariki.\n{mobile}: {mobileNumber} - {mobileName}\n{bank}: {bankAccount} - {bankName}.\nAhsante sana.`
  }
]

export const eventTypes = [
  {
    label: "Harusi",
    value: "harusi",
    icon: ""
  },
  {
    label: "Send-Off",
    value: "send-off",
    icon: ""
  }
]

export const mobileNetworks = [
  {
    label: "M-Pesa",
    value: "M-Pesa",
    icon: ""
  },
  {
    label: "Mixx by Yas",
    value: "Mixx by Yas",
    icon: ""
  },
  {
    label: "Airtel Money",
    value: "Airtel Money",
    icon: ""
  },
  {
    label: "HaloPesa",
    value: "HaloPesa",
    icon: ""
  },
  {
    label: "AzamPesa",
    value: "AzamPesa",
    icon: ""
  },
  {
    label: "Selcom Pesa",
    value: "Selcom Pesa",
    icon: ""
  }
];


export const banks = [
  {
    label: "ABSA Bank Tanzania Limited",
    value: "Absa",
    icon: ""
  },
  {
    label: "AccessBank Tanzania Limited",
    value: "AccessBank",
    icon: ""
  },
  {
    label: "Akiba Commercial Bank Plc",
    value: "Akiba",
    icon: ""
  },
  {
    label: "Amana Bank Limited",
    value: "Amana",
    icon: ""
  },
  {
    label: "Azania Bank Limited",
    value: "Azania",
    icon: ""
  },
  {
    label: "Bank of Africa Tanzania Limited",
    value: "BOA",
    icon: ""
  },
  {
    label: "Bank of Baroda Tanzania Limited",
    value: "Baroda",
    icon: ""
  },
  {
    label: "Bank of India Tanzania Limited",
    value: "BoI",
    icon: ""
  },
  {
    label: "Canara Bank (Tanzania) Limited",
    value: "Canara",
    icon: ""
  },
  {
    label: "China Dasheng Bank Limited",
    value: "Dasheng",
    icon: ""
  },
  {
    label: "Citibank Tanzania Limited",
    value: "Citibank",
    icon: ""
  },
  {
    label: "CRDB Bank Plc",
    value: "CRDB",
    icon: ""
  },
  {
    label: "DCB Commercial Bank Plc",
    value: "DCB",
    icon: ""
  },
  {
    label: "Diamond Trust Bank Tanzania Limited",
    value: "DTB",
    icon: ""
  },
  {
    label: "Ecobank Tanzania Limited",
    value: "Ecobank",
    icon: ""
  },
  {
    label: "Equity Bank Tanzania Limited",
    value: "Equity",
    icon: ""
  },
  {
    label: "Exim Bank Tanzania Limited",
    value: "Exim",
    icon: ""
  },
  {
    label: "Guaranty Trust Bank (Tanzania) Limited",
    value: "GTBank",
    icon: ""
  },
  {
    label: "Habib African Bank Limited",
    value: "Habib",
    icon: ""
  },
  {
    label: "I&M Bank (Tanzania) Limited",
    value: "I&M",
    icon: ""
  },
  {
    label: "International Commercial Bank (Tanzania) Limited",
    value: "ICB",
    icon: ""
  },
  {
    label: "KCB Bank Tanzania Limited",
    value: "KCB",
    icon: ""
  },
  {
    label: "Letshego Bank (T) Limited",
    value: "Letshego",
    icon: ""
  },
  {
    label: "Mkombozi Commercial Bank Plc",
    value: "Mkombozi",
    icon: ""
  },
  {
    label: "Mwalimu Commercial Bank Plc",
    value: "Mwalimu",
    icon: ""
  },
  {
    label: "National Bank of Commerce Limited",
    value: "NBC",
    icon: ""
  },
  {
    label: "NCBA Bank Tanzania Limited",
    value: "NCBA",
    icon: ""
  },
  {
    label: "NMB Bank Plc",
    value: "NMB",
    icon: ""
  },
  {
    label: "Stanbic Bank Tanzania Limited",
    value: "Stanbic",
    icon: ""
  },
  {
    label: "Standard Chartered Bank Tanzania Limited",
    value: "StandardChartered",
    icon: ""
  },
  {
    label: "Tanzania Commercial Bank Plc",
    value: "TCB",
    icon: ""
  },
  {
    label: "United Bank for Africa Tanzania Limited",
    value: "UBA",
    icon: ""
  },
  {
    label: "Uchumi Commercial Bank Limited",
    value: "Uchumi",
    icon: ""
  },
  {
    label: "UmojaSwitch Company Limited",
    value: "UmojaSwitch",
    icon: ""
  },
  {
    label: "Yetu Microfinance Bank Plc",
    value: "Yetu",
    icon: ""
  }
];


export const smsPackages = [
  {
    key: '1',
    package: 'Starter Pack',
    price: 'Tshs. 35,000',
    smsCount: '500',
    expiry: 'No Expiry',
  },
  {
    key: '2',
    package: 'Basic Pack',
    price: 'Tshs. 65,000',
    smsCount: '1,000',
    expiry: 'No Expiry',
  },
  {
    key: '3',
    package: 'Standard Pack',
    price: 'Tshs. 90,000',
    smsCount: '1,500',
    expiry: 'No Expiry',
  },
  {
    key: '4',
    package: 'Plus Pack',
    price: 'Tshs. 110,000',
    smsCount: '2,000',
    expiry: 'No Expiry',
  },
  {
    key: '5',
    package: 'Solid Pack',
    price: 'Tshs. 150,000',
    smsCount: '3,000',
    expiry: 'No Expiry',
  },
  {
    key: '6',
    package: 'Premium Pack',
    price: 'Tshs. 180,000',
    smsCount: '4,000',
    expiry: 'No Expiry',
  },
];