import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogsService } from '../application/blogs.service';
import { BlogsQueryRepository } from '../infrastructure/query/blogs.query-repository';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { GetBlogsQueryParams } from './input-dto/get-blogs-query-params.dto';
import { BlogViewDto } from './view-dto/blog-view.dto';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogsQueryRepository: BlogsQueryRepository,
    private blogsService: BlogsService,
  ) {
    console.log('BlogsController created');
  }

  @Get()
  async getAll(
    @Query() query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    return this.blogsQueryRepository.getAll(query);
  }

  // @Get(':id/posts')
  // async getPostsByBloggerId(
  //   @Param('blogId') blogId: string,
  // ): Promise<PaginatedViewDto<PostViewDto[]>> {
  //   const blog = await this.blogsQueryRepository.getByIdOrNotFoundFail(blogId);
  //   const posts = await this.postsQueryRepository.getAllByBlogId(blog.id);
  // }

  @Post()
  async createBlog(@Body() body: CreateBlogDto): Promise<BlogViewDto> {
    const blog = await this.blogsService.createBlog(body);

    return blog;
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string): Promise<BlogViewDto> {
    return this.blogsQueryRepository.getByIdOrNotFoundFail(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() body: CreateBlogDto,
  ): Promise<void> {
    await this.blogsService.updateBlog(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Delete(':id')
  async deleteBlog(@Param('id') id: string): Promise<void> {
    await this.blogsService.deleteBlog(id);
  }
}
