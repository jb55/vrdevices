
var test = require('tape');
var vrdevices = require('../');

test('all works', function (t) {
  t.plan(2);

  vrdevices(function(err, devices){
    t.notOk(err, err && err.message);
    t.equal(devices.length, 2);
    console.log(devices);
  });
});

test('hmds work', function (t) {
  t.plan(3);

  vrdevices.hmds(function(err, devices){
    t.notOk(err, err && err.message);
    t.equal(devices.length, 1);
    t.ok(devices[0] instanceof HMDVRDevice, "device is hmd");
  });
});

test('position sensors work', function (t) {
  t.plan(3);

  vrdevices.positionSensors(function(err, devices){
    t.notOk(err, err && err.message);
    t.equal(devices.length, 1);
    t.ok(devices[0] instanceof PositionSensorVRDevice, 
         "device is position sensor");
  });
});
