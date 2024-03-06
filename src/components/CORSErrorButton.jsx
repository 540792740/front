import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"

export const CORSErrorButton = () => {
  const { fetch } = useFetchWithState()

  const handleClick = () => {
    fetch(`${apiUrl}/test-cors-error`)
  }

  return (
    <button onClick={handleClick}>CORS error button</button>
  )
}