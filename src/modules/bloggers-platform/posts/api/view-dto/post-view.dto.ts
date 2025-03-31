import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { PostDocument } from '../../domain/post.entity';

export class NewestLikeInfoDto {
  @ApiProperty({
    example: '2025-03-29T17:33:18.738Z',
    description: 'The date when the like was added',
  })
  @Expose()
  addedAt: string;

  @ApiProperty({
    example: 'string',
    description: 'The unique identifier of the user who liked',
  })
  @Expose()
  userId: string;

  @ApiProperty({
    example: 'string',
    description: 'The login of the user who liked',
  })
  @Expose()
  login: string;
}

export class ExtendedLikesInfoDto {
  @ApiProperty({ example: 0, description: 'Total number of likes' })
  @Expose()
  likesCount: number;

  @ApiProperty({ example: 0, description: 'Total number of dislikes' })
  @Expose()
  dislikesCount: number;

  @ApiProperty({
    example: 'None',
    description: 'The like status of the current user',
  })
  @Expose()
  myStatus: string;

  @ApiProperty({
    type: [NewestLikeInfoDto],
    description: 'The newest likes on the post',
  })
  @Expose()
  @Type(() => NewestLikeInfoDto)
  newestLikes: NewestLikeInfoDto[];
}

export class PostViewDto {
  @ApiProperty({
    description: 'Unique identifier of the post',
  })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Title of the post' })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'Short description of the post',
  })
  @Expose()
  shortDescription: string;

  @ApiProperty({ description: 'Content of the post' })
  @Expose()
  content: string;

  @ApiProperty({
    description: 'Identifier of the blog to which the post belongs',
  })
  @Expose()
  blogId: string;

  @ApiProperty({
    description: 'Name of the blog to which the post belongs',
  })
  @Expose()
  blogName: string;

  @ApiProperty({
    example: '2025-03-29T17:33:18.738Z',
    description: 'Date when the post was created',
  })
  @Expose()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  createdAt: Date;

  static mapToView(post: PostDocument): PostViewDto {
    return {
      id: post.id,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
      createdAt: post.createdAt,
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
        newestLikes: [],
      },
    };
  }

  @ApiProperty({
    type: ExtendedLikesInfoDto,
    description: 'Information about likes and dislikes for the post',
  })
  @Expose()
  @Type(() => ExtendedLikesInfoDto)
  extendedLikesInfo: ExtendedLikesInfoDto;
}
