import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"

export const SometimesFailedButton = () => {

    const {fetch} = useFetchWithState()

    const handleClick = () => {
        fetch(`${apiUrl}/json-response-test`, {method: "POST"})
        fetch(`${apiUrl}/sometimes-fail`, {method: "POST"})
    }

    return (
        <button onClick={handleClick}>Sometimes failed button</button>
    )
}
