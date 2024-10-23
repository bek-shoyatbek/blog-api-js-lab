import { IsArray, IsString } from "class-validator";

export class UpdateBlogDto {
  @IsString()
  title?: string;
  @IsString()
  content?: string;
  @IsArray()
  tags?: string[];
}
