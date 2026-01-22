import React, { useEffect, useState } from 'react';
import { Alert, ConfirmInput, Select, Spinner } from '@inkjs/ui';
import { Newline, Text } from 'ink';
import { startRecording, stopRecording } from './recorder.js';

export type MeetingType = 'business' | 'refinement' | 'retrospective' | 'standup';

export function App({meetingType}: {meetingType: MeetingType}) {
	const [meeting, setMeeting] = useState<MeetingType | undefined>(meetingType);
	const [logs, setLogs] = useState<string[]>([`Listening to the ${meeting} meeting...`]);
	const [micInstance, setMicInstance] = useState<any>(null);

	useEffect(() => {
		if (meeting && !micInstance) {
		  const mic = startRecording(`recording-${meeting}.wav`);
		  setMicInstance(mic);
	
		  const interval = setInterval(() => {
			setLogs(prev => [...prev, `🎧 Listening to the ${meeting} meeting...`]);
		  }, 3000);
	
		  return () => clearInterval(interval);
		}
		return;
	  }, [meeting]);

	  const stop = () => {
		if (micInstance) stopRecording(micInstance);
		setLogs(prev => [...prev, '✅ Meeting ended. File saved.']);
	  };	

	const listeningMessage = <>
		<Newline />
		<Alert variant="info"><Text bold>Meeting {meeting} started!</Text></Alert>
		{logs.map((line, i) => (
        <Spinner label={line} key={i} />
		))}
		<Newline />
		<Text>🔴 Press enter to stop the meeting</Text>
		<ConfirmInput
			defaultChoice='confirm'
			submitOnEnter={true}
			onConfirm={() => {
				stop();
			}}
			onCancel={() => {
				console.log('Meeting not stopped');
			}}
		/>
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
