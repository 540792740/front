import { StatusType } from "@/stores/serviceMessageStore";
import dayjs from 'dayjs'

export const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'failed':
      return 'error-box-container'

    default:
      return 'success-box-container'
  }
}
export const getTimeStamp = (timeStamp: number) => {
  return dayjs.unix(timeStamp).format('YYYY-MM-DD HH:mm:ss'); // Convert timeStamp to format: year-month-day hour:minute:second
}
