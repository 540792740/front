import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"

export const MissingKeyJSONErrorButton = () => {

    const {fetch} = useFetchWithState()

    const handleClick = () => {
        fetch(`${apiUrl}/input-test`, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            another_seed: "seed"
        })})
    }

    return (
        <button onClick={handleClick}>Missing key JSON error button</button>
    )
}
