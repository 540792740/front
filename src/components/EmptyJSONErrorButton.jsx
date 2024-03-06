import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"

export const EmptyJSONErrorButton = () => {

    const { fetch } = useFetchWithState()

    const handleClick = () => {
        fetch(`${apiUrl}/input-test`)
    }

    return (
        <button onClick={handleClick}>Empty JSON error button</button>
    )
}
