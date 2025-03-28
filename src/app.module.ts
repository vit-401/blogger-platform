import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TestingModule } from './modules/testing/testing.module';
import { BloggersPlatformModule } from './modules/bloggers-platform/blogs/bloggers-platform.module';
import { CoreModule } from './core/core.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@nest-bloggers-cluster.khgeqyk.mongodb.net/nest-bloggers-db?retryWrites=true&w=majority&appName=nest-bloggers-cluster`,
    ),
    UserAccountsModule, //все модули должны быть заимпортированы в корневой модуль, либо напрямую, либо по цепочке (через другие модули)
    TestingModule,
    BloggersPlatformModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
