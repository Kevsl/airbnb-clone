import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }
  @UseGuards(JwtGuard)
  @Post('/new')
  insertNewCategory(@Body() dto: CategoryDto) {
    return this.categoryService.insertNewCategory(dto);
  }
  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  editCategory(@Body() dto: CategoryDto, @Param('id') id: string) {
    return this.categoryService.editCategory(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
