
import { ApplicationRoutes, GetRouter, Router, UnAuthRoutes, WebServer } from 'mission.api';
import { WebConfig } from './config';

export const server = new WebServer(WebConfig, console);

import './controller';
const route: Router = GetRouter();
route.use(UnAuthRoutes);
route.use(ApplicationRoutes);

server.init();
server.addApiRouting('/', route);
server.start();
