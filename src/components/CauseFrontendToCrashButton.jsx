import { useState } from "react"

const CauseFrontendToCrashComponent = () => {
    let a = 1
    throw new Error('Crash!');
}

// Do not change this file
// You will need to handle the error, and send the log on the outer layer of this component
export const CauseFrontendToCrashButton = () => {

    const [buttonClicked, setButtonClicked] = useState(false)

    const handleClick = () => {
        setButtonClicked(true)
    }

    return (
        <>
            {/* Fix the crashing error using a component that is wrapped outside CauseFrontendToCrashButton component */}
            <button onClick={handleClick}>FIXME: Cause frontend to crash button</button>
            {buttonClicked && <CauseFrontendToCrashComponent />}
        </>
    )
}
