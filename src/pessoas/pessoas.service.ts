import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoaEntity } from './entities/pessoa.entity';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(PessoaEntity)
    private readonly pessoaRepository: Repository<PessoaEntity>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const pessoaData = {
      name: createPessoaDto.name,
      passwordHash: createPessoaDto.password,
      email: createPessoaDto.email,
    };

    const novaPessoa = await this.pessoaRepository.create(pessoaData);
    await this.pessoaRepository.save(novaPessoa);

    return novaPessoa;
  }

  findAll() {
    return `This action returns all pessoas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
