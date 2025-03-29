import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogModelType } from '../domain/blog.entity';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { BlogViewDto } from '../api/view-dto/blog-view.dto';
import { BlogsRepository } from '../infrastructure/blogers.repository';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private BlogModel: BlogModelType,
    private blogsRepository: BlogsRepository,
  ) {
    console.log('BlogsService crated');
  }

  async createBlog(dto: CreateBlogDto): Promise<BlogViewDto> {
    const blog = this.BlogModel.createInstance(dto);

    await this.blogsRepository.save(blog);
    return BlogViewDto.mapToView(blog);
  }
}
