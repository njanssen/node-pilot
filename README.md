# node-pilot

Node.js interface for Hundred Rabbit's [Pilot](https://github.com/hundredrabbits/Pilot).
Pilot is an open source UDP synthesizer which is typically used to produce sound with the esoteric programming language [Orca](https://github.com/hundredrabbits/Orca).

## What does this library do?

This library supports:
- Sending commands to Pilot over UDP (e.g. `BPM125;A5CF8`)
- Sending specific commands such as notes to Pilot using convenience functions 
- Generating commands such as notes with helper functions
- Generating command arguments (e.g. scale a float to a value between `0` and `F`)

## Installation

```
npm install @vliegwerk/pilot --save
```

## Basic usage
The following code can be used to start sending UDP messages to Pilot running on your computer:

```
const Pilot = require('@vliegwerk/pilot')
const pilot = new Pilot()

// Send multiple commands at once using the ; separator
pilot.sendCommand('BPM125;A5CF8')
```

This code create a new `Pilot` instance and sends the command `BPM125;A5CF8` to UDP port `49161`. More information about Pilot's commands can be found in the README of its [GitHub repository](https://github.com/hundredrabbits/Pilot#commands).

The `Pilot` instance contains a number of convenience functions such as `sendNote`:

```
// Send note to channel A: octave 8, note C, velocity F, and duration 1/2 bar
pilot.sendNote('A',5,'C','F',8)
```

For more examples, see the `examples` folder in the [node-pilot repository](https://github.com/njanssen/node-pilot/tree/master/examples) on GitHub.

## Configuration options

By default, your `Pilot` instance will send UDP messages to `127.0.0.1:49161`. When Pilot runs on another computer connected to the same network, you can specify another host to use for communicating with Pilot when creating an instance of `Pilot` in your code:

```
const pilot = new Pilot({
    address: 10.1.0.52,
    port: 49161
})
```

## Extras

- Install Pilot by following the instructions found in the README of its [GitHub repository](https://github.com/hundredrabbits/Pilot#readme) or download a pre-built version of the Electron app [here](https://hundredrabbits.itch.io/pilot).
- See the [License](LICENSE) file for license rights and limitations (MIT).
- Pull Requests are welcome!
