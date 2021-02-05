import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleEntity } from './people.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(PeopleEntity)
    private readonly peopleRepository: Repository<PeopleEntity>,
  ) {}

  private async findOneById(id: number): Promise<PeopleEntity> {
    const peopleInfo = await this.peopleRepository.findOne(id);
    if (!peopleInfo) {
      throw new HttpException(`指定 id=${id} 不存在`, 404);
    }
    return peopleInfo;
  }

  async updatePeople(id: number, people: PeopleEntity): Promise<void> {
    await this.findOneById(id);
    delete people.id;
    this.peopleRepository.update(id, people);
  }

  async findOnePeople(id: number): Promise<PeopleEntity> {
    return this.findOneById(id);
  }

  async findAllPeople(): Promise<PeopleEntity[]> {
    return this.peopleRepository.find();
  }
}
