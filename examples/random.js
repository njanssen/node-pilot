'use strict'

const Pilot = require('../')
const pilot = new Pilot()

// Send random note to a random channel at a random interval
const random = () => {
	const channel = Pilot.scaleToArgs(Math.random(), 0, 1)

	const octave =
		Pilot.scaleToArray(Math.random(), 0, 1, Pilot.OCTAVES)

	const note =
		Pilot.scaleToArray(Math.random(), 0, 1, Pilot.NOTES)

	const velocity = Pilot.scaleToArgs(Math.random(), 0, 1)

	const duration = Pilot.scaleToArgs(Math.random(), 0, 1)

	console.log(
		`Sending note ${Pilot.generateNoteCmd(
			channel,
			octave,
			note,
			velocity,
			duration
		)}`
	)

	pilot.sendNote(channel, octave, note, velocity, duration)

	setTimeout(() => {
		random()
	}, Pilot.scale(Math.random(), 0, 1, 100, 1000))
}

random()
