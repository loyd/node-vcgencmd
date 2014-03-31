# node-vcgencmd
Binding for vcgencmd.

## Install
    npm install vcgencmd

## Usage
```javascript
var vcgencmd = require('vcgencmd');
console.log(vcgencmd.codecEnabled('H264'));
console.log(vcgencmd.measureClock('core'));
```

## API
[See elinux for details](http://elinux.org/RPI_vcgencmd_usage).

Note that case matters.

### `measureClock(string clock) → number`
`clock` can be one of **arm, core, h264, isp, v3d, uart, pwm, emmc, pixel, vec, hdmi, dpi**.

### `measureVolts(string id) → number`
`id` can be one of **core, sdram_c, sdram_i, sdram_p**.

### `measureTemp() → number`

### `codecEnabled(string codec) → boolean`
`codec` can be one of **H264, MPG2, WVC1, MPG4, MJPG, WMV9**.

### `getConfig(string config) → Object|number|string`
`config` is specific option (for example, **arm_freq**), **int** or **str**. if `config` is **int** or **str** then return map of numbers or strings respectively.

### `getCamera() → {boolean supported, boolean detected}`

### `getMem(string mem) → number`
`mem` can be **arm** or **gpu**.

## Changelog
### v0.1.0
* `measureClock`, `measureTemp`, `codecEnabled`, `getConfig`, `getCamera`, `getMem`
