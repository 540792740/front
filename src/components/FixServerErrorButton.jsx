import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"

export const FixServerErrorButton = () => {

    const {fetch} = useFetchWithState()

    const handleClick = () => {
        const data = document.getElementById('data').value
        if (data) {
            fetch(`${apiUrl}/input-test`, {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                data
            })})
        } else {
            alert("Data should not be empty")
        }
    }

    return (
        <button onClick={handleClick}>FIXME: server error button</button>
    )
}
