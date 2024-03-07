import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"

export const EmptyJSONErrorButton = () => {

    const { fetch } = useFetchWithState()

    const handleClick = () => {
        fetch(`${apiUrl}/input-test`, { method: "POST", body: JSON.stringify() })
        fetch(`${apiUrl}/input-test`, { method: "POST", body: JSON.stringify({}) })
        fetch(`${apiUrl}/input-test`, { method: "POST", body: JSON.stringify({ data: 1 }) })
        fetch(`${apiUrl}/input-test`, { method: "POST", body: JSON.stringify({ data: {} }) })
    }

    return (
        <button onClick={handleClick}>Empty JSON error button</button>
    )
}
