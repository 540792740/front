import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"

export const MethodNotAllowedErrorButton = () => {

    const { fetch } = useFetchWithState()

    const handleClick = () => {
        fetch(`${apiUrl}/test-method-not-allowed`, { method: 'POST' })
    }

    return (
        <button onClick={handleClick}>Method not allowed error button</button>
    )
}