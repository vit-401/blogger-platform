import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PostViewDto {
  @ApiProperty({
    example: 'string',
    description: 'Unique identifier of the post',
  })
  @Expose()
  id: string;

  @ApiProperty({ example: 'string', description: 'Title of the post' })
  @Expose()
  title: string;

  @ApiProperty({
    example: 'string',
    description: 'Short description of the post',
  })
  @Expose()
  shortDescription: string;

  @ApiProperty({ example: 'string', description: 'Content of the post' })
  @Expose()
  content: string;

  @ApiProperty({
    example: 'string',
    description: 'Identifier of the blog to which the post belongs',
  })
  @Expose()
  blogId: string;

  @ApiProperty({
    example: 'string',
    description: 'Name of the blog to which the post belongs',
  })
  @Expose()
  blogName: string;

  @ApiProperty({
    example: '2025-03-29T17:33:18.738Z',
    description: 'Date when the post was created',
  })
  @Expose()
  createdAt: string;

  // @ApiProperty({
  //   type: ExtendedLikesInfoDto,
  //   description: 'Information about likes and dislikes for the post',
  // })
  // @Expose()
  // @Type(() => ExtendedLikesInfoDto)
  // extendedLikesInfo: ExtendedLikesInfoDto;
}
