

function getVRDevices(done) {
  if (navigator.getVRDevices) {
    return navigator.getVRDevices().then(next);
  } else if (navigator.mozGetVRDevices) {
    return navigator.mozGetVRDevices(next);
  } else {
    return done(Error("Your browser is not VR Ready"), []);
  }

  function next(devices) {
    return done(null, devices || []);
  }
}

function getType(typ, done) {
  return getVRDevices(function(err, devices){
    if (err) return done(err, devices);
    done(null, devices.filter(function(device){
      return device instanceof typ;
    }));
  });
}

function getPositionSensors(done) {
  return getType(PositionSensorVRDevice, done);
}

function getHmds(done) {
  return getType(HMDVRDevice, done);
}

getVRDevices.positionSensors = getPositionSensors;
getVRDevices.hmds = getHmds;

module.exports = getVRDevices;
