import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDto } from './DTOs/create-recado.dto';
import { UpdateRecadoDto } from './DTOs/update-recado.dto';
import { RecadoEntity } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: RecadoEntity[] = [
    {
      id: 1,
      text: 'Recado teste',
      from: 'Luiz',
      to: 'Anna',
      isRead: false,
      date: new Date(),
    },
  ];

  findAll() {
    return this.recados;
  }

  findOne(id: number) {
    const data = this.recados.find((item) => item.id === id);
    if (data) return data;

    throw new NotFoundException();
  }

  create(createRecadoDto: CreateRecadoDto) {
    this.lastId++;
    const id = this.lastId;
    const novoRecado = {
      id,
      text: createRecadoDto.text!,
      from: createRecadoDto.from!,
      to: createRecadoDto.to!,
      isRead: false,
      date: new Date(),
    };
    this.recados.push(novoRecado);

    return novoRecado;
  }

  update(id: string, updateRecadoDto: UpdateRecadoDto) {
    const recadoExisteIndex = this.recados.findIndex(
      (item) => item.id === Number(id),
    );

    if (recadoExisteIndex < 0) throw new NotFoundException();

    const recadoExiste = this.recados[recadoExisteIndex];

    return (this.recados[recadoExisteIndex] = {
      ...recadoExiste,
      ...updateRecadoDto,
    });
  }

  remove(id: number) {
    const recadoExisteIndex = this.recados.findIndex((item) => item.id === id);
    if (recadoExisteIndex < 0) throw new NotFoundException();

    this.recados.splice(recadoExisteIndex, 1);
  }
}
