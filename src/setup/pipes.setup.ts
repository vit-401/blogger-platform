import { INestApplication, ValidationPipe } from '@nestjs/common';

export function pipesSetup(app: INestApplication) {
  //Глобальный пайп для валидации и трансформации входящих данных.
  //На следующем занятии рассмотрим подробнее
  app.useGlobalPipes(
    new ValidationPipe({
      //class-transformer создает экземпляр dto
      //соответственно применятся значения по-умолчанию
      //и методы классов dto
      //transform: true - включает трансформацию входящих данных
      //в соответствии с типами данных в dto
      //example: { age: '25' } => { age: 25 }
      transform: true,
    }),
  );
}
