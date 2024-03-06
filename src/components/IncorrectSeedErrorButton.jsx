import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"

export const IncorrectSeedErrorButton = () => {

    const {fetch} = useFetchWithState()

    const handleClick = () => {
        fetch(`${apiUrl}/input-test`, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            data: "seed"
        })})
    }

    return (
        <button onClick={handleClick}>Incorrect data format error button</button>
    )
}
