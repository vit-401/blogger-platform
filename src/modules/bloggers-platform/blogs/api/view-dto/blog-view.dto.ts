import { Expose, Transform } from 'class-transformer';
import { BlogDocument } from '../../domain/blog.entity';

export class BlogViewDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  websiteUrl: string;

  @Expose()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  createdAt: Date;

  @Expose()
  isMembership: boolean;

  static mapToView(blog: BlogDocument): BlogViewDto {
    return {
      id: blog.id,
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    };
  }
}
