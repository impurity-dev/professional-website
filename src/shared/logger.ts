import * as log from 'loglevel';
import { env } from '../managers/env-manager';

log.setLevel(env.logLevel);

export const debug = log.debug;
export const info = log.info;
export const warn = log.warn;
export const error = log.error;
