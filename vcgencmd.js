"use strict";

var binding = require('./build/Release/binding');
var request = binding.request;


/**
 * Measure clock frequency.
 * @param  {string} clock one of 'arm', 'core', 'h264', 'isp', 'v3d', 'uart',
 *                        'pwm', 'emmc', 'pixel', 'vec', 'hdmi', 'dpi'
 * @return {number}
 */
exports.measureClock = function(clock) {
    var answer = request('measure_clock ' + clock);

    // 'frequency(0)=0' or 'error=2 error_msg="Invalid arguments"'
    if (answer[10] === '0' || answer[0] === 'e')
        throw new Error('clock is incorrect');

    return +answer.slice(answer.indexOf('=') + 1);
};

/**
 * Measure voltage.
 * @param  {string} [id='core'] one of 'core', 'sdram_c', 'sdram_i', 'sdram_p'
 * @return {number}
 */
exports.measureVolts = function(id) {
    var answer = request('measure_volts ' + (id || ''));

    // 'bad arguments'
    if (answer[0] === 'b')
        throw new Error('id is incorrect');

    return parseFloat(answer.slice(5));
};

/**
 * Measure core temperature of BCM2835 SoC.
 * @return {number}
 */
exports.measureTemp = function() {
    return parseFloat(request('measure_temp').slice(5));
};

/**
 * Check if the specified codec is enabled.
 * @param  {string} codec one of 'H264', 'MPG2', 'WVC1', 'MPG4', 'MJPG', 'WMV9'
 * @return {boolean}
 */
exports.codecEnabled = function(codec) {
    switch (codec) {
        case 'H264':
        case 'MPG2':
        case 'WVC1':
        case 'MPG4':
        case 'MJPG':
        case 'WMV9':
            break;

        default:
            throw new Error('codec is incorrect');
    }

    return request('codec_enabled ' + codec)[5] === 'e';
};

/**
 * Get the configurations you have set.
 * @param  {string} config specific option, 'int' or 'str'
 * @return {Object|number|string}
 */
exports.getConfig = function(config) {
    if (!config)
        throw new Error('config is incorrect');
    
    var isNumMap = config === 'int',
        isMap = isNumMap || config === 'str',
        answer = request('get_config ' + config).trim();

    if (isMap)
        return answer.split('\n').reduce(function(res, line) {
            var pair = line.split('=');
            res[pair[0]] = isNumMap ? +pair[1] : pair[1];
            return res;
        }, {});
    else {
        if (/unknown$/.test(answer))
            throw new Error('config is incorrect');

        var pair = answer.split('=');
        return +pair[1] || pair[1];
    }
};

/**
 * Get info about availability of camera.
 * @return {Object} {supported, detected}
 */
exports.getCamera = function() {
    var answer = request('get_camera');
    return {
        supported: answer[10] === '1',
        detected:  answer[21] === '1'
    };
};

/**
 * Get how much memory is split between the CPU (arm) and GPU.
 * @param  {string} mem 'arm' or 'gpu'
 * @return {number}
 */
exports.getMem = function(mem) {
    if (!(mem === 'arm' || mem === 'gpu'))
        throw new Error('mem is incorrect');

    return parseInt(request('get_mem ' + mem).slice(4), 10);
};

/**
 * Get height, width, and depth of the display framebuffer
 * @return {Object} {width, height, depth}
 */
exports.getLCDInfo = function() {
    var info = request('get_lcd_info').split(' ');
    return {
        width:  +info[0],
        height: +info[1],
        depth:  +info[2]
    };
};

/**
 * Flush GPU's L1 cache
 */
exports.cacheFlush = function() {
    request('cache_flush');
};

process.on('exit', function() {
    binding.disconnect();
});
