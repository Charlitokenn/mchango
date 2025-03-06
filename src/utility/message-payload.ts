import { messageTemplates } from "../constants";
import {currencyNumber} from "./currency-numbers";
import { daysUntil, formatDate } from "./date-formater";

type Pledger = {
    id: number;
    firstName: string;
    lastName: string;
    countryCode: string | null;
    mobile: string;
    amount: number;
    paid: number;
    balance: number;
};

type Event = {
    eventType: string, 
    bank: string,
    bankAccountName: string,
    bankAccountNumber: string,
    brideGroomNames: string,
    eventDate: Date,
    mobileNet: string,
    namePaymentMobile: string,
    paymentMobile: string
}

type MessagePayload = { phoneNumbers: string[]; message: string }[];

export const createMessagePayload = (selectedPledgers: Pledger[], events: Event): MessagePayload => {
    const template = messageTemplates[2].value

    return selectedPledgers.map((pledger) => {
        const {firstName, countryCode, mobile, amount, balance} = pledger;
        const {eventType, bank,bankAccountName,bankAccountNumber,brideGroomNames,eventDate,mobileNet,namePaymentMobile,paymentMobile } = events;
  
        // Replace placeholders in the template with actual data
        const message = template
            .replace("{firstName}", firstName)
            .replace("{ahadi}", currencyNumber(amount))
            .replace("{deni}", currencyNumber(balance))
            .replace("{eventType}", eventType)
            .replace("{eventType}", eventType)
            .replace("{groomBride}", brideGroomNames)
            .replace("{eventDate}", formatDate(eventDate))
            .replace("{mobile}", mobileNet)
            .replace("{bank}", bank)
            .replace("{bankAccount}", bankAccountNumber)
            .replace("{bankName}", bankAccountName)
            .replace("{mobileNumber}", paymentMobile)
            .replace("{mobileName}", namePaymentMobile)
            .replace("{daysToEvent}", daysUntil(eventDate).toString());

        // Combine country code and mobile to form a full phone number
        //FIX ME - Deal with this typescript error
        const phoneNumbers: string[] = [`${countryCode || ""}${mobile}`];

        return {phoneNumbers, message};
    });
}
