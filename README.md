tessel-pulse
============

Pulse your LEDs with tessel. This module works only on [PWM
pins](https://tessel.io/docs/hardwareAPI#pins)

Example
-------

```js
var tessel = require('tessel');
var mqtt = require('mqtt');
var port = tessel.port['GPIO'];
var pulse = require('tessel-pulse');
var pin = port.pwm[0]; // G4
var stop = pulse(pin, {
  type: 'pulse', // or 'blink'
  steps: 200, // the number of increments of the intesity of the led's light
  changeFrequency: 500 // ms after the step is incremented/decremented
});
setTimeout(stop, 10000); // blink for 10s
```

Example with MQTT
-----------------

First, install [MQTT.js](http://npm.im/mqtt) with:

```bash
npm install mqtt --save
```

Then:

```js
var tessel = require('tessel');
var mqtt = require('mqtt');
var port = tessel.port['GPIO'];
var pulse = require('tessel-pulse');
var pin = port.pwm[0]; // G4
var stop = null;
var client = mqtt.connect('mqtt://test.mosca.io');

port.pwmFrequency(10000) // set the PWM frequncy to 10kHz

client.publish('leds/matteo/hello', 'I\'m online!')
client.subscribe('leds/matteo/+')

client.on('message', function(topic, payload) {
  var command = topic.replace('leds/matteo/', '');
  console.log(payload)

  if (!payload)
    payload = {}
  else
    try {
      payload = JSON.parse(payload)
    } catch(err) {
      console.log('wrong json', err)
    }

  if (stop) stop()

  switch(command) {
    case 'start':
      stop = pulse(pin, payload)
      console.log('pulser started');
      break;
    case 'stop':
      console.log('pulser stopped');
      stop = null
      break;
  }
})

console.log('hello from my led!')
```

License
-------

ISC
