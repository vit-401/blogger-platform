import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from "../../../../common/validators/Is-object-id-validator";
// import { IsObjectId } from "../../../../common/validators/Is-object-id-validator";

export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post', example: 'Post Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Short description of the post',
    example: 'This is a short description.',
  })
  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @ApiProperty({
    description: 'Content of the post',
    example: 'The post content goes here.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'ID of the blog to which this post belongs',
    example: 'blogId123',
  })
  @IsString()
  @IsNotEmpty()
  @IsObjectId()
  blogId: string;
}
