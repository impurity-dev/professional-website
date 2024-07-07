import * as log from 'loglevel';
import { env } from '../globals/env-manager';

log.setLevel(env.logLevel);

export const logger = log;
