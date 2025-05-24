import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId!: number;

  @Column('text')
  commentText!: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' }) // додаємо JoinColumn і колонку authorId
  user!: User;

  @Column()
  authorId!: number; // foreign key на користувача

  @ManyToOne(() => Recipe, (recipe) => recipe.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipeId' }) // JoinColumn і колонка recipeId
  recipe!: Recipe;

  @Column()
  recipeId!: number; // foreign key на рецепт

  @CreateDateColumn()
  createdAt!: Date;
}
