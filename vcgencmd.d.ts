declare module "vcgencmd" {
    export function measureClock(clock: 'arm'): number;
    export function measureClock(clock: 'core'): number;
    export function measureClock(clock: 'h264'): number;
    export function measureClock(clock: 'isp'): number;
    export function measureClock(clock: 'v3d'): number;
    export function measureClock(clock: 'uart'): number;
    export function measureClock(clock: 'pwm'): number;
    export function measureClock(clock: 'emmc'): number;
    export function measureClock(clock: 'pixel'): number;
    export function measureClock(clock: 'vec'): number;
    export function measureClock(clock: 'hdmi'): number;
    export function measureClock(clock: 'dpi'): number;
    export function measureClock(clock: string): number;

    export function measureVolts(id: 'core'): number;
    export function measureVolts(id: 'sdram_c'): number;
    export function measureVolts(id: 'sdram_i'): number;
    export function measureVolts(id: 'sdram_p'): number;
    export function measureVolts(id: string): number;

    export function measureTemp(): number;

    export function codecEnabled(codec: 'H264'): boolean;
    export function codecEnabled(codec: 'MPG2'): boolean;
    export function codecEnabled(codec: 'WVC1'): boolean;
    export function codecEnabled(codec: 'MPG4'): boolean;
    export function codecEnabled(codec: 'MJPG'): boolean;
    export function codecEnabled(codec: 'WMV9'): boolean;
    export function codecEnabled(codec: string): boolean;

    export function getConfig(config: 'int'): {[key: string]: number};
    export function getConfig(config: 'str'): {[key: string]: string};
    export function getConfig(config: string): any;

    export function getCamera(): {detected: boolean; supported: boolean};

    export function getMem(mem: 'arm'): number;
    export function getMem(mem: 'gpu'): number;
    export function getMem(mem: string): number;

    export function getLCDInfo(): {width: number; height: number; depth: number};

    export function cacheFlush(): void;
}
