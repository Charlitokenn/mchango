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

export const daysUntil = (dateString: Date) => {
    const today = new Date(); // Get today's date
    const targetDate = new Date(dateString); // Convert the provided date string to a Date object
    
    // Calculate the difference in milliseconds
    const timeDifference = targetDate - today;
    
    // Convert the time difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // 1000ms * 3600s * 24h
    
    return daysDifference;
}