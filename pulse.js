var modifiers = {
  forward: 1,
  backwards: -1
}

function pulser(pin, opts) {
  opts = opts || {};

  var count = 0;
  var direction = 'forward';
  var steps = opts.steps || 20;
  var changeFrequency = opts.changeFrequency || 50;
  var type = opts.type || 'pulse';
  var interval = setInterval(pulse, changeFrequency);

  return stop;

  function pulse() {
    count += modifiers[direction];
    var dutyCycle = count / steps;

    if (type === 'pulse')
      pin.pwmDutyCycle(dutyCycle)
    else if (type === 'blink')
      pin.pwmDutyCycle(dutyCycle > 0.5 ? 1 : 0);

    if (count === steps - 1)
      direction = 'backwards'
    else if (count <= 1)
      direction = 'forward'
  }

  function stop() {
    pin.pwmDutyCycle(0);
    clearInterval(interval);
  }
}

module.exports = pulser;
