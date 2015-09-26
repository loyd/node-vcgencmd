"use strict";

var assert = require('assert');
var lib = require('./vcgencmd');


/*
    measureClock(clock)
 */
assert.throws(function() { lib.measureClock(); }, /incorrect/);
assert.throws(function() { lib.measureClock('Core'); }, /incorrect/);
var coreClock = lib.measureClock('core');
assert.equal(typeof coreClock, 'number');
assert(coreClock > 0);

/*
    measureVolts(id)
 */
assert.throws(function() { lib.measureVolts('Core'); }, /incorrect/);
var coreVolts = lib.measureVolts('core');
assert.equal(typeof coreVolts, 'number');
assert(coreVolts > 0);
assert(lib.measureVolts() > 0);

/*
    measureTemp()
 */
var temp = lib.measureTemp();
assert.equal(typeof temp, 'number');
assert(temp > 0);

/*
    codecEnabled(codec)
 */
assert.throws(function() { lib.codecEnabled(); }, /incorrect/);
assert.throws(function() { lib.codecEnabled('h264'); }, /incorrect/);
assert.equal(typeof lib.codecEnabled('H264'), 'boolean');

/*
    getConfig(config|int|str)
 */
assert.throws(function() { lib.getConfig(); }, /incorrect/);
assert.throws(function() { lib.getConfig('test'); }, /incorrect/);
assert.equal(typeof lib.getConfig('arm_freq'), 'number');
assert(Object.keys(lib.getConfig('int')).length > 0);

/*
    getCamera()
 */
var camera = lib.getCamera();
assert.equal(typeof camera.supported, 'boolean');
assert.equal(typeof camera.detected, 'boolean');

/*
    getMem(mem)
 */
assert.throws(function() { lib.getMem(); }, /incorrect/);
assert.throws(function() { lib.getMem('test'); }, /incorrect/);
var armMem = lib.getMem('arm');
assert.equal(typeof armMem, 'number');
assert(armMem > 0);

/*
    getLCDInfo()
 */
var lcdInfo = lib.getLCDInfo();
assert.equal(typeof lcdInfo.width, 'number');
assert(lcdInfo.width > 0);
assert.equal(typeof lcdInfo.height, 'number');
assert(lcdInfo.height > 0);
assert.equal(typeof lcdInfo.depth, 'number');
assert(lcdInfo.depth > 0);

/*
    cacheFlush()
 */
assert.doesNotThrow(function() { lib.cacheFlush(); });
