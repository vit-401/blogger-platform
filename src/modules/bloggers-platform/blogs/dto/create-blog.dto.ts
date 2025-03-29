import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Name of the blog',
    example: 'My Awesome Blog',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the blog',
    example: 'A blog about technology and innovations.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Website URL of the blog',
    example: 'https://www.example.com',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^https?:\/\/[^\s/$.?#].[^\s]*$/, {
    message: 'websiteUrl must be a valid URL',
  })
  websiteUrl: string;
}

export class UpdateBlogDto {
  name: string;
  description: string;
  websiteUrl: string;
}
