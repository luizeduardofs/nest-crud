import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const pessoaData = {
        name: createPessoaDto.name,
        passwordHash: createPessoaDto.password,
        email: createPessoaDto.email,
      };

      const novaPessoa = this.pessoaRepository.create(pessoaData);
      await this.pessoaRepository.save(novaPessoa);

      return novaPessoa;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail já está em uso');
      }
      throw error;
    }
  }

  async findAll() {
    const pessoas = await this.pessoaRepository.find();
    return pessoas;
  }

  findOne(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoaData = {
      name: updatePessoaDto.name,
      passwordHash: updatePessoaDto.password,
    };
    const pessoa = await this.pessoaRepository.preload({
      id,
      ...pessoaData,
    });
    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');

    return await this.pessoaRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');
    await this.pessoaRepository.remove(pessoa);
  }
}
