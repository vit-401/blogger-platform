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
import { PostsQueryRepository } from '../infrastructure/query/posts.query-repository';
import { PostsService } from '../application/posts-service';
import { GetPostsQueryParams } from './input-dto/get-posts-query-params.dto';
import { PaginatedViewDto } from '../../../../core/dto/base.paginated.view-dto';
import { PostViewDto } from './view-dto/post-view.dto';
import { CreatePostDto } from '../dto/post-create.dto';
import { ParseObjectIdPipe } from '../../../../common/pipes/parse-object-id.pipe';

@Controller('posts')
export class PostsController {
  constructor(
    private postsQueryRepository: PostsQueryRepository,
    private postsService: PostsService,
  ) {}

  @Get()
  async getAll(
    @Query() query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    return this.postsQueryRepository.getAll(query);
  }

  @Post()
  async post(@Body() body: CreatePostDto): Promise<PostViewDto> {
    return await this.postsService.createPost(body);
  }

  @Get(':id')
  async getPostById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<PostViewDto> {
    return this.postsQueryRepository.getByIdOrNotFoundFail(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updatePost(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: CreatePostDto,
  ): Promise<void> {
    await this.postsService.updatePost(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deletePost(@Param('id', ParseObjectIdPipe) id: string): Promise<void> {
    await this.postsService.deletePost(id);
  }
}
