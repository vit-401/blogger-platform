import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryParams } from '../../../../../core/dto/base.query-params.input-dto';
import { PostsSortBy } from './posts-sort-by.enum';

export class GetPostsQueryParams extends BaseQueryParams {
  /**
   * Field to sort by (e.g., 'title', 'createdAt', 'updatedAt')
   */
  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: PostsSortBy,
    default: PostsSortBy.CreatedAt,
  })
  @IsOptional()
  @IsEnum(PostsSortBy)
  sortBy: PostsSortBy = PostsSortBy.CreatedAt;
}
