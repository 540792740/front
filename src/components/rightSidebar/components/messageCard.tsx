import './messageCard.scss'; // 导入SCSS样式文件
import useStores from '@/hooks/useStores'
import { MessageListModel } from '@/stores/serviceMessageStore';
import { Collapse } from 'antd';
import { getStatusColor, getTimeStamp } from '@/utils/general';

interface MessageCardProps {
  responseDetails: MessageListModel
}
const MessageCard = (props: MessageCardProps) => {
  const { ServiceMessageStore } = useStores()

  const CollapseHeader = () => {
    return <div className='collapse-header-container' >
      <div className='bold'>{props.responseDetails.route}</div>
      <div>
        {getTimeStamp(props.responseDetails.timestamp)}
      </div>
    </div>
  }
  return (
    <Collapse
      className={getStatusColor(props.responseDetails.status)}
      items={[{
        key: '1',
        label: <CollapseHeader />,
        children: props.responseDetails.message
      }]}
    />
  );
};

export default MessageCard;
