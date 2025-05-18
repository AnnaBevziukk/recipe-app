import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity'; // Якщо є юзер модель

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
}
