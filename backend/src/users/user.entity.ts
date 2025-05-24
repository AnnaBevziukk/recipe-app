import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity'; // ← додай імпорт
import { Rating } from '../rating/rating.entity';
import { Comment } from '../comment/comment.entity';

export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  // 👇 Додаємо зворотний зв'язок на рецепти
  @OneToMany(() => Recipe, (recipe) => recipe.author)
  recipes!: Recipe[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings!: Rating[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];
}
