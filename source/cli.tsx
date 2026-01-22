#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import { App, MeetingType } from './app.js';

const cli = meow(
	`
	Usage
	  $ ai-meeting-coach

	Options
		--type  The type of meeting you want to coach for

	Examples
	  $ ai-meeting-coach --type=refinement
	  Listening to the refinement meeting...
`,
	{
		description: 'AI meeting coach',
		autoHelp: true,
		importMeta: import.meta,
		flags: {
			type: {
				type: 'string',
				choices: ['business', 'refinement', 'retrospective', 'standup'],
			},
		},
	},
);

render(<App meetingType={cli.flags.type as MeetingType} />);
