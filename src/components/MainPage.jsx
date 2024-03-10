import React from "react";
import { CauseFrontendToCrashButton } from "./CauseFrontendToCrashButton"
import { CORSErrorButton } from "./CORSErrorButton"
import { EmptyJSONErrorButton } from "./EmptyJSONErrorButton"
import { IncorrectSeedErrorButton } from "./IncorrectSeedErrorButton"
import { MethodNotAllowedErrorButton } from "./MethodNotAllowedErrorButton"
import { MissingKeyJSONErrorButton } from "./MissingKeyJSONErrorButton"
import { DataInput } from "./DataInput"
import { FixServerErrorButton } from "./FixServerErrorButton"
import { SuccessWithDelayButton } from "./SuccessWithDelayButton"
import { SometimesFailedButton } from "./SometimesFailedButton"
import RightSidebar from "./rightSidebar"
import ErrorBoundary from "./errorBoundary/index.jsx";

export const MainPage = () => {
	return (
		<div>
			<RightSidebar />
			<h1>Frontend Design Challenge</h1>
			<h6>For all button click events and their results (except frontend crash button), add to a side panel</h6>
			<CORSErrorButton />
			<br />
			<SuccessWithDelayButton />
			<br />
			<MethodNotAllowedErrorButton />
			<br />
			<EmptyJSONErrorButton />
			<br />
			<MissingKeyJSONErrorButton />
			<br />
			<IncorrectSeedErrorButton />
			<br />
			<SometimesFailedButton />
			<br />
			<DataInput />
			<FixServerErrorButton />
			<br />
			<ErrorBoundary >
				<CauseFrontendToCrashButton />
			</ErrorBoundary>
		</div>
	)
}