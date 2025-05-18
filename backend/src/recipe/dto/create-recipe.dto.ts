export class CreateRecipeDto {
  title!: string; // ! означає "гарантовано буде ініціалізовано"
  ingredients!: string[];
  instructions!: string;
  preparationTime!: number;
  imageUrl?: string; // ? означає, що поле необов’язкове
  authorId!: number;
}
