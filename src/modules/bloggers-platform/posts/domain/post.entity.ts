import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CreatePostDto } from '../dto/post-create.dto';

@Schema({ timestamps: true }) // Automatically add createdAt and updatedAt fields
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  blogId: string;

  @Prop({ required: true })
  blogName: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;
  updatedAt: Date;

  update(dto: CreatePostDto) {
    this.updatedAt = new Date();
    this.title = dto.title;
    this.shortDescription = dto.shortDescription;
    this.content = dto.content;
  }

  static createInstance(dto: CreatePostDto): PostDocument {
    const post = new this();
    post.title = dto.title;
    post.shortDescription = dto.shortDescription;
    post.content = dto.content;
    post.blogId = dto.blogId;
    return post as PostDocument;
  }

  // @Prop({
  //   required: true,
  //   default: {
  //     likesCount: 0,
  //     dislikesCount: 0,
  //     myStatus: 'None',
  //     newestLikes: [],
  //   },
  // })
  // extendedLikesInfo: {
  //   likesCount: number;
  //   dislikesCount: number;
  //   myStatus: string;
  //   newestLikes: Array<{
  //     addedAt: Date;
  //     userId: string;
  //     login: string;
  //   }>;
  // };
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.loadClass(Post);

export type PostDocument = HydratedDocument<Post>;

export type PostModelType = Model<PostDocument> & typeof Post;
