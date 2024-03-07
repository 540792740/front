import { makeAutoObservable } from 'mobx';

export type StatusType = 'success' | 'failed';

// List Data Structure
export interface MessageListModel {
  message: string,
  routerPath: string,
  status: StatusType
}
class ServiceMessageStore {

  private _messageList: MessageListModel[] = [
    { message: 'new', routerPath: '/text-test', status: 'success' },
    { message: 'error', routerPath: '/text-test', status: 'failed' },
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