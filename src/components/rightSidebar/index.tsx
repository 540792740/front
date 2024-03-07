import React, { useMemo, useState } from 'react';
import { Drawer, Button, Timeline } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './index.scss';
import useStores from '@/hooks/useStores'
import MessageCard from './components/messageCard';
import { MessageListModel } from '@/stores/serviceMessageStore';

const RightSidebar: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false); // drawer visible
  const { ServiceMessageStore } = useStores()

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  // time line data
  const cardList = () => useMemo(() => {
    const tempList = [];
    ServiceMessageStore.messageList.forEach((element: MessageListModel) => {
      tempList.push({ children: <MessageCard responseDetails={element} /> })
    });
    return tempList;
  }, [ServiceMessageStore.messageList])
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
        onClose={toggleDrawer}
        open={visible}
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
