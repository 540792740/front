import { useEffect, useMemo, useState } from 'react';
import { Drawer, Button, Timeline } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './index.scss';
import useStores from '@/hooks/useStores'
import MessageCard from './components/messageCard';
import { MessageListModel } from '@/stores/serviceMessageStore';
import { apiUrl } from '@/apiUrl.js'
import { useFetchWithState } from "@/components/FetchHook.jsx"
import { getTimeStamp } from '@/utils/general';

let interval;
export const RightSidebar = () => {
  const [visible, setVisible] = useState<boolean>(false); // drawer visible
  const { ServiceMessageStore } = useStores()
  const { fetch } = useFetchWithState()

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  // close drawer and clear the interval
  const onCloseHandler = () => {
    clearInterval(interval)
    toggleDrawer()
  }

  // time line data
  const cardList = () => useMemo(() => {
    const tempList = [];
    ServiceMessageStore.messageList.forEach((element: MessageListModel) => {
      tempList.push({ children: <MessageCard responseDetails={element} /> })
    });
    return tempList;
  }, [ServiceMessageStore.messageList])

  // 打开获取错误数据
  useEffect(() => {
    if (visible) {
      interval = setInterval(() => {
        fetch(`${apiUrl}/error`)
      }, 3000);
    }
  }, [visible])

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        className="open-button-container"
        onClick={toggleDrawer}
      >
        <LeftOutlined />
      </Button>
      <Drawer
        title="Drawer"
        placement="right"
        closable={false}
        onClose={onCloseHandler}
        open={visible}
        className='right-drawer-container'
      >
        <Timeline items={cardList()} />
        <div className="menu">
          {ServiceMessageStore.messageList.map(() => {
            return 's'
          })}
        </div>
      </Drawer>
    </>
  );
};

export default RightSidebar;