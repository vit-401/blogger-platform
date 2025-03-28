import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseQueryParams } from '../../../../../core/dto/base.query-params.input-dto';
import { BlogsSortBy } from './blogs-sort-by.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetBlogsQueryParams extends BaseQueryParams {
  /**
   * Field to sort by (e.g., 'name', 'createdAt', 'updatedAt')
   */
  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: BlogsSortBy,
    default: BlogsSortBy.CreatedAt,
  })
  @IsOptional()
  @IsEnum(BlogsSortBy)
  sortBy: BlogsSortBy = BlogsSortBy.CreatedAt;

  /**
   * Search term to filter blogs by name (case-insensitive partial match)
   */
  @ApiPropertyOptional({
    description:
      'Search term to filter blogs by name (case-insensitive partial match)',
    type: String,
    default: null,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : null))
  searchNameTerm: string | null = null;
}
