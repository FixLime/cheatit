import 'dotenv/config';

export const PORT         = process.env.PORT         || 3000;
export const API_KEY      = process.env.API_KEY       || 'change_me';
export const DB_PATH      = process.env.DB_PATH       || './cheatit.db';

// Server provider
export const PROVIDER = process.env.DATHOST_USER ? 'dathost' : 'docker';

// Dathost
export const DATHOST_USER      = process.env.DATHOST_USER || '';
export const DATHOST_PASSWORD  = process.env.DATHOST_PASSWORD || '';
export const DATHOST_SERVER_ID = process.env.DATHOST_GAME_SERVER_ID || '';

// Docker / self-hosted
export const CS2_IMAGE         = process.env.CS2_IMAGE || 'joedwards32/cs2';
export const CS2_GSLT          = process.env.CS2_GSLT || '';
export const SERVER_IP         = process.env.SERVER_IP || '127.0.0.1';
export const SERVER_PORT_START = parseInt(process.env.SERVER_PORT_START || '27015');

export const CALIBRATION_MATCHES = parseInt(process.env.CALIBRATION_MATCHES || '10');
