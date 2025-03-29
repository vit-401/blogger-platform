import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CreateBlogDto } from '../dto/create-blog.dto';

@Schema({ timestamps: true })
export class Blog {
  /**
   * Name of the blog
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true })
  name: string;

  /**
   * Description of the blog
   * @type {string}
   * @required
   */
  @Prop({ type: String, required: true })
  description: string;

  /**
   * Website URL of the blog
   * @type {string}
   * @required
   */
  @Prop({
    type: String,
    required: true,
    match: /^https?:\/\/[^\s/$.?#].[^\s]*$/, // Basic URL validation
  })
  websiteUrl: string;

  /**
   * Membership status of the blog
   * @type {boolean}
   * @required
   */
  @Prop({ type: Boolean, required: true, default: true }) // Default to true
  isMembership: boolean;

  /**
   * Creation timestamp
   * Explicitly defined despite timestamps: true
   * properties without @Prop for typescript so that they are in the class instance (or in instance methods)
   * @type {Date}
   */
  @Prop({ type: Date, default: new Date() })
  createdAt: Date;
  updatedAt: Date;

  /**
   * Virtual property to get the stringified ObjectId
   * @returns {string} The string representation of the ID
   * если ипсльзуете по всей системе шв айди как string, можете юзать, если id
   */
  get id() {
    // @ts-ignore
    return this._id.toString();
  }

  static createInstance(dto: CreateBlogDto): BlogDocument {
    const blog = new this();
    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;
    blog.isMembership = true;
    return blog as BlogDocument;
  }
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.loadClass(Blog);

export type BlogDocument = HydratedDocument<Blog>;

export type BlogModelType = Model<BlogDocument> & typeof Blog;
