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
export class Rating {
  @PrimaryGeneratedColumn()
  ratingId!: number;

  @Column({ type: 'int', width: 1 })
  score!: number;

  @ManyToOne(() => User, (user) => user.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  user!: User;

  @Column()
  authorId!: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipeId', referencedColumnName: 'recipeId' }) // <-- ключова зміна
  recipe!: Recipe;

  @Column()
  recipeId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
