import { Controller, Get, Query } from '@nestjs/common';
import { BlogsService } from '../application/blogs.service';
import { BlogsQueryRepository } from '../infrastructure/query/blogs.query-repository';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { GetBlogsQueryParams } from './input-dto/get-blogs-query-params.dto';
import { BlogViewDto } from './view-dto/blog-view.dto';

@Controller('blogs')
export class BlogsController {
  constructor(
    private blogsQueryRepository: BlogsQueryRepository,
    private blogsService: BlogsService,
  ) {
    console.log('BlogsController created');
  }

  // @ApiParam({ name: 'id' }) //для сваггера
  // @Get(':id') //users/232342-sdfssdf-23234323
  // async getById(@Param('id') id: string): Promise<BlogViewDto> {
  //   // можем и чаще так и делаем возвращать Promise из action. Сам NestJS будет дожидаться, когда
  //   // промис зарезолвится и затем NestJS вернёт результат клиенту
  //   return this.blogsQueryRepository.getByIdOrNotFoundFail(id);
  // }

  @Get()
  async getAll(
    @Query() query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    return this.blogsQueryRepository.getAll(query);
  }

  //
  // @Post()
  // async createBlog(@Body() body: CreateBlogInputDto): Promise<UserViewDto> {
  //   const blogId = await this.blogsService.createBlog(body);
  //
  //   return this.blogsQueryRepository.getByIdOrNotFoundFail(blogId);
  // }
  //
  // @Put(':id')
  // async updateBlog(
  //   @Param('id') id: string,
  //   @Body() body: UpdateBlogInputDto,
  // ): Promise<BlogViewDto> {
  //   const blogId = await this.blogsService.updateBlog(id, body);
  //
  //   return this.blogsQueryRepository.getByIdOrNotFoundFail(blogId);
  // }
  //
  // @ApiParam({ name: 'id' }) //для сваггера
  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async deleteBlog(@Param('id') id: string): Promise<void> {
  //   return this.blogssService.deleteBlog(id);
  // }
}
