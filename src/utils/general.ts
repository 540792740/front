import { StatusType } from "@/stores/serviceMessageStore";

export const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'failed':
      return 'error-box-container'

    default:
      return 'success-box-container'
  }
}