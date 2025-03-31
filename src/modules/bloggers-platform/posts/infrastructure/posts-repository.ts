import { InjectModel } from '@nestjs/mongoose';
import { Post, PostModelType, PostDocument } from '../domain/post.entity';
import { NotFoundException } from '@nestjs/common';

export class PostRepository {
  constructor(@InjectModel(Post.name) private PostModel: PostModelType) {}

  async findById(id: string): Promise<PostDocument | null> {
    return this.PostModel.findOne({ _id: id });
  }

  async save(post: PostDocument): Promise<void> {
    await post.save();
  }

  async findOrNotFoundFail(id: string): Promise<PostDocument> {
    const post = await this.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async deleteById(id: string): Promise<void> {
    const res = await this.PostModel.deleteOne({ _id: id });
    if (res.deletedCount === 0) {
      throw new NotFoundException('Post not found');
    }
  }
}
