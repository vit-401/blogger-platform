import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GLOBAL_PREFIX } from './global-prefix.setup';
import { createWriteStream } from 'fs';
import { get } from 'http';

export function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('BLOGGER API')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_PREFIX, app, document, {
    customSiteTitle: 'Blogger Swagger',
  });
  const serverUrl = 'https://blogger-platform-zeta.vercel.app';

  get(
    `${serverUrl}/${GLOBAL_PREFIX}/swagger-ui-bundle.js`,
    function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    },
  );

  get(`${serverUrl}/${GLOBAL_PREFIX}/swagger-ui-init.js`, function (response) {
    response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
    console.log(
      `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
    );
  });

  get(
    `${serverUrl}/${GLOBAL_PREFIX}/swagger-ui-standalone-preset.js`,
    function (response) {
      response.pipe(
        createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
      );
      console.log(
        `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
      );
    },
  );

  get(`${serverUrl}/${GLOBAL_PREFIX}/swagger-ui.css`, function (response) {
    response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
    console.log(
      `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
    );
  });
}
