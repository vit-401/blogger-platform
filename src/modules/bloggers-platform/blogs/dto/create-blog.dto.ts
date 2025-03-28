import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^https?:\/\/[^\s/$.?#].[^\s]*$/, {
    message: 'websiteUrl must be a valid URL',
  })
  websiteUrl: string;
}