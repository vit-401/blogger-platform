import { Injectable } from '@nestjs/common';
import { PostRepository } from '../infrastructure/posts-repository';
import { CreatePostDto } from '../dto/post-create.dto';
import { Post, PostModelType } from '../domain/post.entity';
import { PostViewDto } from '../api/view-dto/post-view.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BlogsQueryRepository } from '../../blogs/infrastructure/query/blogs.query-repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private PostModel: PostModelType,
    private postRepository: PostRepository,
    private blogsQueryRepository: BlogsQueryRepository,
  ) {}

  async createPost(dto: CreatePostDto): Promise<PostViewDto> {
    const post = this.PostModel.createInstance(dto);

    const blog = await this.blogsQueryRepository.getByIdOrNotFoundFail(
      dto.blogId,
    );
    if (!blog) {
      throw new Error('Blog not found');
    }

    post.blogName = blog.name;
    await this.postRepository.save(post);
    return PostViewDto.mapToView(post);
  }

  async updatePost(id: string, dto: CreatePostDto): Promise<void> {
    const post = await this.postRepository.findOrNotFoundFail(id);
    post.update(dto);
    await this.postRepository.save(post);
  }

  async deletePost(id: string): Promise<void> {
    await this.postRepository.deleteById(id);
  }
}
