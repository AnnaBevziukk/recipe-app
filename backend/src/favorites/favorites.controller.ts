import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post(':recipeId')
  async addFavorite(@Param('recipeId') recipeId: number, @Req() req) {
    const userId = req.user.userId;
    return this.favoritesService.addFavorite(userId, recipeId);
  }

  @Get()
  async getFavorites(@Req() req) {
    const userId = req.user.userId;
    return this.favoritesService.getFavorites(userId);
  }

  @Delete(':recipeId')
  async removeFavorite(@Param('recipeId') recipeId: number, @Req() req) {
    const userId = req.user.userId;
    return this.favoritesService.removeFavorite(userId, recipeId);
  }
}
