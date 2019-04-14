import { config, DotenvConfigOutput } from 'dotenv';
import { StaticFileConfig, WebServerConfig } from 'mission.api';

const env: DotenvConfigOutput = config();
if (env.error) {
    throw env.error;
}

export const WebConfig: WebServerConfig = {
    apiPort: Number(process.env.WEB_PORT),
    corsOptions: {
        allowedHeaders: (process.env.CORS_ALLOWED_HEADERS || '').split(','),
        credentials: Boolean(process.env.CORS_CREDENTIALS),
        exposedHeaders: (process.env.CORS_EXPOSED_HEADERS || '').split(','),
        maxAge: Number(process.env.CORS_MAX_AGE),
        methods: (process.env.CORS_METHODS || '').split(','),
        origin: process.env.CORS_ORIGIN,
    },
    httpsCertificatepath: process.env.WEB_SSL_CERTIFICATE_PATH || '',
    httpsKeypath: process.env.WEB_SSL_KEY_PATH || '',
    isHttpsEnabled: !!process.env.WEB_SSL_CERTIFICATE_PATH,
};

export const FileConfig: StaticFileConfig = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: ['index.html', 'index.htm'],
    maxAge: process.env.STATIC_FILE_MAX_AGE || '1d',
    redirect: false,
    setHeaders: (res: any, path: string, stat: string) => {
        res.set('x-timestamp', Date.now().toString());
    },
};
