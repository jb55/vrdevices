/* global HMDVRDevice, PositionSensorVRDevice, VRDisplay */

var test = require('tape');
var vrdevices = require('../');

if (navigator.getVRDisplays) {
  test('all works', function (t) {
    t.plan(2);

    vrdevices(function (err, devices) {
      t.notOk(err, err && err.message);
      t.equal(devices.length, 1);
      console.log(devices);
    });
  });

  test('HMDs work', function (t) {
    t.plan(3);

    vrdevices.hmds(function (err, devices) {
      t.notOk(err, err && err.message);
      t.equal(devices.length, 1);
      t.ok(devices[0] instanceof VRDisplay, 'HMD is of type `VRDisplay`');
    });
  });

  test('position sensors work', function (t) {
    t.plan(3);

    vrdevices.positionSensors(function (err, devices) {
      t.notOk(err, err && err.message);
      t.equal(devices.length, 1);
      t.ok(devices[0] instanceof VRDisplay, 'Position Sensor is of type `VRDisplay`');
    });
  });
} else if (navigator.getVRDevices) {
  test('all works', function (t) {
    t.plan(2);

    vrdevices(function (err, devices) {
      t.notOk(err, err && err.message);
      t.equal(devices.length, 2);
      console.log(devices);
    });
  });

  test('HMDs work', function (t) {
    t.plan(3);

    vrdevices.hmds(function (err, devices) {
      t.notOk(err, err && err.message);
      t.equal(devices.length, 1);
      t.ok(devices[0] instanceof HMDVRDevice, 'HMD is of type `HMDVRDevice`');
    });
  });

  test('position sensors work', function (t) {
    t.plan(3);

    vrdevices.positionSensors(function (err, devices) {
      t.notOk(err, err && err.message);
      t.equal(devices.length, 1);
      t.ok(devices[0] instanceof PositionSensorVRDevice,
           'Position Sensor is of type `PositionSensorVRDevice`');
    });
  });
}
