import { useEffect, useMemo, useState } from 'react';
import { Drawer, Button, Timeline, Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import './index.scss';
import useStores from '@/hooks/useStores'
import MessageCard from './components/messageCard';
import { MessageListModel } from '@/stores/serviceMessageStore';
import { apiUrl } from '@/apiUrl.js'
import { useFetchWithState } from "@/components/FetchHook.jsx"
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
const { Search } = Input;
let interval;
const RightSidebar = () => {
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

  const onSearch = (e) => {
    fetch(`${apiUrl}/errors?message=${e}`)
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

  const drawerTitleWithSearch = () => {
    return <div>
      <h3>Request History</h3>
      <div>
        <Search placeholder="input search text" onSearch={onSearch} enterButton />
      </div>

    </div>
  }
  // 打开获取错误数据
  useEffect(() => {
    if (visible) {
      fetch(`${apiUrl}/errors`)
    }
  }, [visible])

  useEffect(() => {
    ServiceMessageStore.setMessageList(data || [])
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
        placement="right"
        onClose={onCloseHandler}
        closable={false}
        open={visible}
        title={drawerTitleWithSearch()}
        className='right-drawer-container'
      >
        <Timeline items={cardList()} />
      </Drawer>
    </>
  );
};

export default observer(RightSidebar)