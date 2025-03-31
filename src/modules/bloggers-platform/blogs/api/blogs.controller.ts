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
import { ParseObjectIdPipe } from '../../../../common/pipes/parse-object-id.pipe';
import { PostViewDto } from '../../posts/api/view-dto/post-view.dto';
import { GetPostsQueryParams } from '../../posts/api/input-dto/get-posts-query-params.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogsQueryRepository: BlogsQueryRepository,
    private blogsService: BlogsService,
  ) {}

  @Get()
  async getAll(
    @Query() query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    return this.blogsQueryRepository.getAll(query);
  }

  @Get(':id/posts')
  async getPostsByBlogId(
    @Query() query: GetPostsQueryParams,
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    return this.blogsQueryRepository.getPostsByBlogId(id, query);
  }

  @Post()
  async createBlog(@Body() body: CreateBlogDto): Promise<BlogViewDto> {
    const blog = await this.blogsService.createBlog(body);

    return blog;
  }

  @Get(':id')
  async getBlogById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<BlogViewDto> {
    return this.blogsQueryRepository.getByIdOrNotFoundFail(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updateBlog(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: CreateBlogDto,
  ): Promise<void> {
    await this.blogsService.updateBlog(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
  })
  @Delete(':id')
  async deleteBlog(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.blogsService.deleteBlog(id);
  }
}
