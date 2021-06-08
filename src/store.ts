import { Application } from 'pixi.js';
import { Dimensions, Player } from './types';

export const resolution: Dimensions = {
  width: 1920,
  height: 1080,
};

export const app = new Application({
  backgroundColor: 0x63ace8,
  width: resolution.width,
  height: resolution.height,
  antialias: false,
});

export const inputs = {
  turnCounterclockwise: false,
  turnClockwise: false,
  accelerate: false,
  fire: false,
};

export const PLAYER_MIN_SPEED = 600;
export const PLAYER_MAX_SPEED = 10;
export const PLAYER_ROTATION_SPEED = 1;
export const PLAYER_ACCELERATION_FORCE = 4;
export const PLAYER_DRAG_FORCE = 2;

export const player: Player = {
  position: { x: 500, y: 500 },
  rotation: -Math.PI / 2,
  speed: PLAYER_MIN_SPEED,
};
