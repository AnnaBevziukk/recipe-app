import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UsersModule } from '../users/users.module';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, RecipeModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
