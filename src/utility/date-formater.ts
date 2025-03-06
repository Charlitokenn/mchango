import dayjs from "dayjs";

export const formatDate = (dateString?: string | Date) => {
    if (!dateString) return ""; // Handle undefined/null cases

    const date = dateString instanceof Date ? dateString : new Date(dateString);
    
    if (isNaN(date.getTime())) return ""; // Handle invalid date cases

    return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const convertToDayjs = (dateString: string | undefined) => {
    return dateString ? dayjs(dateString) : undefined;
};


export const formatDateWithTime = (dateString?: string | Date) => {
    if (!dateString) return ""; // Handle undefined/null cases

    const date = dateString instanceof Date ? dateString : new Date(dateString);
    
    if (isNaN(date.getTime())) return ""; // Handle invalid date cases

    return date.toLocaleString("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

export const daysUntil = (dateInput: string | Date) => {
    const today = new Date(); // Get today's date
    const targetDate = new Date(dateInput); // Ensure it's a Date object

    if (isNaN(targetDate.getTime())) {
        throw new Error("Invalid date input"); // Handle invalid dates
    }

    // Calculate the difference in milliseconds
    const timeDifference = targetDate.getTime() - today.getTime();

    // Convert the time difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference;
};
