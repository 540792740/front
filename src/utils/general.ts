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

export const getTimeStamp = (timeStamp: string) => {
  return dayjs().format(timeStamp)
}