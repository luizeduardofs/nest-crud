import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { RecadoEntity } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(RecadoEntity)
    private readonly recadoRepository: Repository<RecadoEntity>,
  ) {}

  async findAll() {
    return await this.recadoRepository.find();
  }

  async findOne(id: number) {
    const data = await this.recadoRepository.findOne({
      where: {
        id,
      },
    });

    if (data) return data;

    throw new NotFoundException();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      text: createRecadoDto.text!,
      from: createRecadoDto.from!,
      to: createRecadoDto.to!,
      isRead: false,
    };

    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);

    return recado;
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.recadoRepository.preload({
      id,
      ...updateRecadoDto,
    });

    if (!recado) throw new NotFoundException();

    await this.recadoRepository.save(recado);

    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });
    if (!recado) throw new NotFoundException();
    await this.recadoRepository.remove(recado);
  }
}
