import { apiUrl } from "../apiUrl"
import { useFetchWithState } from "./FetchHook"

export const CORSErrorButton = () => {
  const { fetch } = useFetchWithState()

  const handleClick = () => {
    fetch(new URL(apiUrl).origin + "/test-cors-error", { mode: 'no-cors' })
  }

  return (
    <button onClick={handleClick}>CORS error button</button>
  )
}