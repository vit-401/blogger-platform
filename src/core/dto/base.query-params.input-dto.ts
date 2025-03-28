import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

//базовый класс для query параметров с пагинацией
//значения по-умолчанию применятся автоматически при настройке глобального ValidationPipe в main.ts
export class BaseQueryParams {
  //для трансформации в number
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    type: Number,
    default: 1,
  })
  @Type(() => Number)
  pageNumber: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    type: Number,
    default: 10,
  })
  @Type(() => Number)
  pageSize: number = 10;

  @ApiPropertyOptional({
    description: 'Sort direction',
    enum: SortDirection,
    default: SortDirection.Desc,
  })
  sortDirection: SortDirection = SortDirection.Desc;

  calculateSkip() {
    return (this.pageNumber - 1) * this.pageSize;
  }
}
