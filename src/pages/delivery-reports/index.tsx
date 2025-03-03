import { ColumnChart } from "../../components/reports/column-chart"
import { ReportsTable } from "../../components/reports/reports-table"

export const DeliveryReports = () => {
  // const formData = new URLSearchParams();
  // formData.append("id", "ATXid_ff169824ab16bb5f8dc675b91495cc4a");
  // formData.append("phoneNumber", "+255745896547");
  // formData.append("status", "Success");
  // formData.append("networkCode", "64001");
  // formData.append("failureReason", "test reason");
  // formData.append("retryCount", "1");

  // const response = await fetch("/delivery-sms", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZW9nbGRycnRhb2Jxdm10dHpwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDIwNzUyOSwiZXhwIjoyMDQ5NzgzNTI5fQ.eCSHWd9SOxaC6bjw-QvaA3pvfQYSoU9Rj_wTFiPWaIQ`  // Add the Bearer token
  //   },
  //   body: formData.toString()
  // });
  
  // const data = await response.json();
  // console.log(data);
  
  return (
    <>
    <ColumnChart/>
    <ReportsTable/>
    </>
  )
}
