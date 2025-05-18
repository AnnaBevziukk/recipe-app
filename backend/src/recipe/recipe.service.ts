import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.recipeRepository.create(createRecipeDto);
    return this.recipeRepository.save(recipe);
  }

  findAll() {
    return this.recipeRepository.find();
  }

  findOne(id: number) {
    return this.recipeRepository.findOneBy({ recipeId: id });
  }

  remove(id: number) {
    return this.recipeRepository.delete(id);
  }
}
