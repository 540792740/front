import { useEffect, useMemo, useState } from 'react';
import { Drawer, Button, Timeline } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './index.scss';
import useStores from '@/hooks/useStores'
import MessageCard from './components/messageCard';
import { MessageListModel } from '@/stores/serviceMessageStore';
import { apiUrl } from '@/apiUrl.js'
import { useFetchWithState } from "@/components/FetchHook.jsx"
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
let interval;
export const RightSidebar = () => {
  const [visible, setVisible] = useState<boolean>(false); // drawer visible
  const { ServiceMessageStore } = useStores()
  const { fetch, data } = useFetchWithState()

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
      tempList.push({
        children: <MessageCard responseDetails={element} />,
        dot: element.status === 'succeeded' ? <CheckCircleFilled style={{ color: '#7cb305', fontSize: '1.5em' }} /> : <CloseCircleFilled style={{ color: '#cf1322', fontSize: '1.5em' }} />,
      })
    });
    return tempList;
  }, [ServiceMessageStore.messageList])

  // 打开获取错误数据
  useEffect(() => {
    if (visible) {
      fetch(`${apiUrl}/errors`)
    }
  }, [visible])

  useEffect(() => {
    if (data && data.length > 0) {
      ServiceMessageStore.setMessageList(data)
    }
  }, [data])


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
        mask={false}
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