import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(dto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(dto);
    return this.commentRepository.save(comment);
  }

  async findByRecipe(recipeId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { recipeId } });
  }

  async delete(id: number): Promise<void> {
    const res = await this.commentRepository.delete(id);
    if (!res.affected) throw new NotFoundException('Comment not found');
  }
}
