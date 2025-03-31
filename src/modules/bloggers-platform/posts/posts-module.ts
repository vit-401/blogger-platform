import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './domain/post.entity';
import { PostsController } from './api/posts-controller';
import { PostsService } from './application/posts-service';
import { PostsQueryRepository } from './infrastructure/query/posts.query-repository';
import { PostRepository } from './infrastructure/posts-repository';
import { BlogsQueryRepository } from '../blogs/infrastructure/query/blogs.query-repository';
import { Blog, BlogSchema } from '../blogs/domain/blog.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Blog.name, schema: BlogSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsQueryRepository,
    BlogsQueryRepository,
    PostRepository,
  ],
})
export class PostsModule {}
