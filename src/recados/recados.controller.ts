import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRecadoDto } from './DTOs/create-recado.dto';
import { UpdateRecadoDto } from './DTOs/update-recado.dto';
import { RecadosService } from './recados.service';

interface QueryParams {
  limit: number;
  offset: number;
}

@Controller('recados')
export class RecadosController {
  constructor(private readonly service: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: QueryParams) {
    const { limit, offset } = query;

    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.service.create(createRecadoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    return this.service.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
