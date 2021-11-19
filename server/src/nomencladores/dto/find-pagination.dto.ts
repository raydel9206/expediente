import { IsNotEmpty } from 'class-validator';
export class FindPaginationDto {
  keyword: string;
  @IsNotEmpty()
  take: number;
  @IsNotEmpty()
  skip: number;
  combo: boolean;
}
