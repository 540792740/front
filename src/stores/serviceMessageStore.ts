import { makeAutoObservable } from 'mobx';

export type StatusType = 'succeeded' | 'failed';

// List Data Structure
export interface MessageListModel {
  message: string,
  route: string,
  status: StatusType
  method: "GET" | "POST" | 'PUT' | 'DELETE'
  timestamp: number
}
class ServiceMessageStore {

  private _messageList: MessageListModel[] = []; // error message list

  constructor() {
    makeAutoObservable(this);
  }

  initData = () => {

  }

  get messageList() {
    return this._messageList;
  }

  // 训练ID
  setMessageList = (list: MessageListModel[]) => {
    this._messageList = list;
  }

  deleteTrainId = async (id: string) => {

  }
}

const serviceMessageStore = new ServiceMessageStore();
(window as any).serviceMessageStore = serviceMessageStore

export default serviceMessageStore;