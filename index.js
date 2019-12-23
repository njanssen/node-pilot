'use strict'

const udp = require('dgram')

const OPTION_DEFAULTS = {
	address: '127.0.0.1',
	port: 49161
}

const ARGS = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F'
]

const NOTES = ['C', 'c', 'D', 'd', 'E', 'F', 'f', 'G', 'g', 'A', 'a', 'B']

const OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8]

class Pilot {
	constructor(options = {}) {
		const {
			address: address = OPTION_DEFAULTS.address,
			port = OPTION_DEFAULTS.port
		} = options

		this.port = port
		this.address = address
		this.socket = udp.createSocket('udp4')
	}

	sendCmd = command => {
		const packet = Buffer.from(command)
		const len = packet.length
		this.socket.send(packet, 0, len, this.port, this.address)
	}

	sendNote = (channel, octave, note, velocity, duration) => {
		this.sendCmd(`${channel}${octave}${note}${velocity}${duration}`)
	}

	static generateNoteCmd = (channel, octave, note, velocity, duration) => {
		return `${channel}${octave}${note}${velocity}${duration}`
	}

	static scaleToArgs = (f, fmin, fmax) => {
		return this.scaleToArray(f, fmin, fmax, ARGS)
	}

	static scaleToArray = (num, in_min, in_max, arr) => {
		const out_min = 0
		const out_max = arr.length - 1
		const idx = Math.round(
			this.scale(num, in_min, in_max, out_min, out_max)
		)
		return arr[idx]
	}

	static scale = (num, in_min, in_max, out_min, out_max) => {
		return (
			((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
		)
	}

	static get ARGS() {
		return ARGS
	}

	static get NOTES() {
		return NOTES
	}

	static get OCTAVES() {
		return OCTAVES
	}
}

module.exports = Pilot
