import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Rating } from '../rating/rating.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  recipeId!: number;

  @Column()
  title!: string;

  @Column('text', { array: true })
  ingredients!: string[];

  @Column()
  instructions!: string;

  @Column()
  preparationTime!: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column()
  authorId!: number;

  // 👇 Зв'язок з користувачем
  @ManyToOne(() => User, (user) => user.recipes, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author!: User;

  // Нове поле для модерації
  @Column({ default: false })
  isModerated!: boolean;

  @CreateDateColumn()
  createdAt!: Date; // ← додаємо цю колонку

  @OneToMany(() => Rating, (rating) => rating.recipe)
  ratings!: Rating[];

  @OneToMany(() => Comment, (comment) => comment.recipe)
  comments!: Comment[];
}
