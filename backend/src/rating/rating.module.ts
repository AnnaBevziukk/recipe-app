import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { UsersModule } from '../users/users.module';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), UsersModule, RecipeModule],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
