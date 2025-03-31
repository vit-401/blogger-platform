import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginatedViewDto } from '../../../../../core/dto/base.paginated.view-dto';
import { FilterQuery, Types } from 'mongoose';
import { Blog, BlogDocument, BlogModelType } from '../../domain/blog.entity';
import { GetBlogsQueryParams } from '../../api/input-dto/get-blogs-query-params.dto';
import { BlogViewDto } from '../../api/view-dto/blog-view.dto';
import { GetPostsQueryParams } from '../../../posts/api/input-dto/get-posts-query-params.dto';
import { PostViewDto } from '../../../posts/api/view-dto/post-view.dto';
import {
  Post,
  PostDocument,
  PostModelType,
} from '../../../posts/domain/post.entity';

@Injectable()
export class BlogsQueryRepository {
  constructor(
    @InjectModel(Blog.name)
    private BlogModel: BlogModelType,
    @InjectModel(Post.name) private PostModel: PostModelType,
  ) {}

  async getAll(
    query: GetBlogsQueryParams,
  ): Promise<PaginatedViewDto<BlogViewDto[]>> {
    const filter: FilterQuery<BlogDocument> = {};

    // Apply searchNameTerm filter
    if (query.searchNameTerm) {
      filter.name = { $regex: query.searchNameTerm, $options: 'i' };
    }

    // Fetch blogs with pagination, sorting, and filtering
    const blogs = await this.BlogModel.find(filter)
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.calculateSkip())
      .limit(query.pageSize)
      .exec();

    // Get the total count of matching documents
    const totalCount = await this.BlogModel.countDocuments(filter).exec();

    // Map BlogDocument[] to BlogViewDto[]
    const items = blogs.map(BlogViewDto.mapToView);

    // Return paginated response
    return PaginatedViewDto.mapToView({
      items,
      totalCount,
      page: query.pageNumber,
      size: query.pageSize,
    });
  }

  async getPostsByBlogId(
    id: string,
    query: GetPostsQueryParams,
  ): Promise<PaginatedViewDto<PostViewDto[]>> {
    const blog = await this.BlogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Build the filter for posts
    const filter: FilterQuery<PostDocument> = {
      blogId: new Types.ObjectId(id),
    };

    // Fetch posts with pagination, sorting, and filtering
    const posts = await this.PostModel.find(filter)
      .sort({ [query.sortBy]: query.sortDirection })
      .skip(query.calculateSkip())
      .limit(query.pageSize)
      .exec();

    // Get the total count of matching posts
    const totalCount = await this.PostModel.countDocuments(filter).exec();

    // Map PostDocument[] to PostViewDto[]
    const items = posts.map(PostViewDto.mapToView);

    // Return paginated response
    return PaginatedViewDto.mapToView({
      items,
      totalCount,
      page: query.pageNumber,
      size: query.pageSize,
    });
  }

  async getByIdOrNotFoundFail(id: string): Promise<BlogViewDto> {
    const blog = await this.BlogModel.findOne({
      _id: id,
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return BlogViewDto.mapToView(blog);
  }
}
