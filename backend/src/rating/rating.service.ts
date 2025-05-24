import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const existing = await this.ratingRepository.findOne({
      where: {
        authorId: createRatingDto.authorId,
        recipeId: createRatingDto.recipeId,
      },
    });

    if (existing) {
      existing.score = createRatingDto.score;
      return this.ratingRepository.save(existing);
    }

    const rating = this.ratingRepository.create(createRatingDto);
    return this.ratingRepository.save(rating);
  }

  async findByRecipe(recipeId: number): Promise<Rating[]> {
    return this.ratingRepository.find({ where: { recipeId } });
  }

  async delete(id: number): Promise<void> {
    const res = await this.ratingRepository.delete(id);
    if (!res.affected) throw new NotFoundException('Rating not found');
  }
}
