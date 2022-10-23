import { PartialType } from '@nestjs/mapped-types';
import { IsString } from "class-validator";
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsString()
    category_name: string
}
