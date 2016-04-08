/* global HMDVRDevice, PositionSensorVRDevice, VRDisplay */

function getVRDevices (done) {
  if (navigator.getVRDisplays) {
    return navigator.getVRDisplays().then(next);
  } else if (navigator.getVRDevices) {
    return navigator.getVRDevices().then(next);
  } else if (navigator.mozGetVRDevices) {
    return navigator.mozGetVRDevices(next);
  } else {
    return done(new Error('Your browser is not VR Ready'), []);
  }

  function next (devices) {
    return done(null, devices || []);
  }
}

function getType (typ, done) {
  return getVRDevices(function (err, devices) {
    if (err) { return done(err, devices); }
    done(null, devices.filter(function (device) {
      return device instanceof typ;
    }));
  });
}

function getPositionSensors (done) {
  var typ = window.VRDisplay || window.PositionSensorVRDevice;
  return getType(typ, done);
}

function getHmds (done) {
  var typ = window.VRDisplay || window.HMDVRDevice;
  return getType(typ, done);
}

getVRDevices.positionSensors = getPositionSensors;
getVRDevices.hmds = getHmds;

module.exports = getVRDevices;
