interface Props {
    phoneNumbers: string,
    message: string
}

export const sendSMS = async ({phoneNumbers,message}:Props) => {

    const payload = new URLSearchParams({
        username: import.meta.env.VITE_AT_USERNAME,
        to: phoneNumbers,
        message: message
    });

    try {
        const response = await fetch(import.meta.env.VITE_AT_ENDPOINT, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "apiKey": import.meta.env.VITE_AT_API_KEY,
            },
            body: payload.toString(),
        });

        if (!response.ok) {
            throw new Error(`Failed to send SMS (${response.status}): ${response.statusText}`);
        }

        const data = await response.json();
        return data.SMSMessageData;
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw new Error("Failed to send SMS. Please try again later.");
    }
};

export const sendDummySMS = async ({phoneNumbers,message}:Props) => {
    const payload = new URLSearchParams({
        username: import.meta.env.VITE_AT_SANDBOX_USERNAME,
        to: phoneNumbers,
        message: message
    });

    try {
        const response = await fetch(import.meta.env.VITE_AT_SANDBOX_ENDPOINT, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "apiKey": import.meta.env.VITE_AT_SANDBOX_API_KEY,
            },
            body: payload.toString(),
        });

        if (!response.ok) {
            // return response
            throw new Error(`Failed to send SMS (${response.status}): ${response.statusText}`);
        }

        const data = await response.json();
        
        return data.SMSMessageData;
    } catch (error) {
        console.error("Error sending SMS:", error);
        // return error
        throw new Error("Failed to send SMS. Please try again later.");
    }
};

export const verifyMobileNumber = async ({phoneNumbers,message}:Props) => {
    const payload = new URLSearchParams({
        username: import.meta.env.VITE_AT_SANDBOX_USERNAME,
        to: phoneNumbers,
        message: message
    });

    try {
        const response = await fetch(import.meta.env.VITE_AT_SANDBOX_ENDPOINT, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "apiKey": import.meta.env.VITE_AT_SANDBOX_API_KEY,
            },
            body: payload.toString(),
        });

        if (!response.ok) {
            // return response
            throw new Error(`Failed to verify mobile number`);
        }

        const data = await response.json();
        return data.SMSMessageData;
    } catch (error) {
        console.error("Error sending SMS:", error);
        // return error
        throw new Error("Failed to verify number. Please recheck");
    }
};
