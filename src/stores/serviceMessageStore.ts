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

  private _messageList: MessageListModel[] = [
    { message: 'new', route: '/text-test', status: 'succeeded', method: 'GET', timestamp: 2222 },
    { message: 'error', route: '/text-test', status: 'failed', method: 'GET', timestamp: 2222 },
  ]; // error message list

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