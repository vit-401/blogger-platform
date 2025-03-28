import { INestApplication } from '@nestjs/common';

export const GLOBAL_PREFIX = 'api';

export function globalPrefixSetup(app: INestApplication) {
  //специальный метод, который добавляет ко всем маршрутам /GLOBAL_PREFIX
  app.setGlobalPrefix(process.env.GLOBAL_PREFIX || GLOBAL_PREFIX);
}
