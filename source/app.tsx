import React, { useEffect, useState } from 'react';
import { Alert, Select, Spinner } from '@inkjs/ui';
import { Newline, Text } from 'ink';

export type MeetingType = 'business' | 'refinement' | 'retrospective' | 'standup';

export function App({meetingType}: {meetingType: MeetingType}) {
	const [meeting, setMeeting] = useState<MeetingType | undefined>(meetingType);
	const [logs, setLogs] = useState<string[]>([`Listening to the ${meeting} meeting...`]);

	useEffect(() => {
		const interval = setInterval(() => {
		  setLogs(prev => [...prev, `Listening to the ${meeting} meeting...`]);
		}, 2000);
		return () => clearInterval(interval);
	  }, []);

	const listeningMessage = <>
		<Newline />
		<Alert variant="info"><Text bold>Meeting {meeting} started!</Text></Alert>
		{logs.map((line, i) => (
        <Spinner label={line} key={i} />
      ))}
	</>;

	const selectTypeMessage = <>
		<Newline />
		<Alert variant="info"><Text bold>Select the type of meeting you are about to start:</Text></Alert>
		<Select
			options={[
				{ label: 'Business', value: 'business' },
				{ label: 'Refinement', value: 'refinement' },
				{ label: 'Retrospective', value: 'retrospective' },
				{ label: 'Standup', value: 'standup' },
			]}
			onChange={(value: string) => setMeeting(value as MeetingType)}
		/>
	</>;

	return (
		<>
			{meeting ? listeningMessage : selectTypeMessage}
		</>
	);
}
