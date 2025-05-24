import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteRecipe } from './favorite-recipe.entity';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteRecipe])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
