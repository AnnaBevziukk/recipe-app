import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteRecipe } from './favorite-recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteRecipe)
    private favoriteRepo: Repository<FavoriteRecipe>,
  ) {}

  async addFavorite(userId: number, recipeId: number) {
    const existing = await this.favoriteRepo.findOne({
      where: { userId, recipeId },
    });
    if (existing) return existing;

    const fav = this.favoriteRepo.create({ userId, recipeId });
    return await this.favoriteRepo.save(fav);
  }

  async getFavorites(userId: number) {
    return await this.favoriteRepo.find({
      where: { userId },
      relations: ['recipe'],
      order: { createdAt: 'DESC' },
    });
  }

  async removeFavorite(userId: number, recipeId: number) {
    return await this.favoriteRepo.delete({ userId, recipeId });
  }
}
