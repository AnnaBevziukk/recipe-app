import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity'; // обов'язково для @Roles

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // Відкритий маршрут — кожен може дивитись відмодеровані рецепти
  @Get('approved')
  findAllApproved() {
    return this.recipeService.findAllApproved();
  }

  // Створення рецепта — будь-який залогінений користувач
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto, @CurrentUser() user: any) {
    if (!user || (!user.id && !user.userId)) {
      throw new UnauthorizedException('User not found or not logged in');
    }

    const authorId = user.id || user.userId;

    return this.recipeService.create({
      ...createRecipeDto,
      authorId,
    });
  }

  // Отримання невідмодерованих — тільки модератори
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR)
  @Get('pending')
  findAllPending() {
    return this.recipeService.findAllPending();
  }

  // Перегляд конкретного рецепта — для залогінених
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  // Затвердження рецепта — тільки модератор
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR)
  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.recipeService.approve(+id);
  }

  // Видалення рецепта — тільки модератор
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MODERATOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
