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

  // Створити рецепт, додати isModerated: false за замовчуванням
  create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.recipeRepository.create({
      ...createRecipeDto,
      isModerated: false, // автоматично нові рецепти не модеровані
    });
    return this.recipeRepository.save(recipe);
  }

  // Витягнути всі рецепти (зараз без фільтра)
  findAll() {
    return this.recipeRepository.find();
  }

  // Витягнути лише відмодеровані рецепти
  findAllApproved() {
    return this.recipeRepository.find({ where: { isModerated: true } });
  }

  // Витягнути рецепти, які чекають на модерацію
  findAllPending() {
    return this.recipeRepository.find({ where: { isModerated: false } });
  }

  // Витягнути один рецепт за id
  findOne(id: number) {
    return this.recipeRepository.findOneBy({ recipeId: id });
  }

  // Схвалити рецепт — оновити isModerated на true
  approve(id: number) {
    return this.recipeRepository.update(id, { isModerated: true });
  }

  // Відхилити (видалити) рецепт
  remove(id: number) {
    return this.recipeRepository.delete(id);
  }
}
