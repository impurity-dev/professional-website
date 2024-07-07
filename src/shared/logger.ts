import * as log from 'loglevel';
import { env } from '../managers/env-manager';

log.setLevel(env.logLevel);

export const logger = log;
