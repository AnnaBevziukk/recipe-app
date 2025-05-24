import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ratings')
@UseGuards(JwtAuthGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto, @Request() req) {
    createRatingDto.authorId = req.user.userId;
    return this.ratingService.create(createRatingDto);
  }

  @Get('recipe/:recipeId')
  findByRecipe(@Param('recipeId') recipeId: string) {
    return this.ratingService.findByRecipe(+recipeId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ratingService.delete(+id);
  }
}
