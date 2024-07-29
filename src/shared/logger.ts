import * as log from 'loglevel';
import * as settings from '../managers/settings';
log.setLevel(settings.global.logLevel);

export const debug = log.debug;
export const info = log.info;
export const warn = log.warn;
export const error = log.error;
