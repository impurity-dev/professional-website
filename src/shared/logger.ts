import * as log from 'loglevel';
import * as settings from '../managers/settings-manager';
log.setLevel(settings.manager.logLevel);

export const debug = log.debug;
export const info = log.info;
export const warn = log.warn;
export const error = log.error;
