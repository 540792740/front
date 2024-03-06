import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"
import { useState } from 'react';

export const SuccessWithDelayButton = () => {
    const { fetch } = useFetchWithState();

    const [isProcessing, setIsProcessing] = useState(false); // 添加一个状态来表示按钮是否正在处理中

    const handleClick = async () => {
        setIsProcessing(true); // 在点击按钮时设置状态为处理中

        // 发起请求
        try {
            await fetch(`${apiUrl}/succeed-with-delay`);
        } catch (error) {
            console.error('Error occurred while fetching data:', error);
        } finally {
            setIsProcessing(false); // 无论请求成功还是失败，都将状态重置为非处理中
        }
    }

    return <button onClick={handleClick} disabled={isProcessing}>FIXME: Always succeed with delay button</button> 
}
