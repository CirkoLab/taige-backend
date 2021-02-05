import { Controller, Get, Post, Body } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('/api/people')
export class ProjectController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async findAllPeople() {
    const data = await this.peopleService.findAllPeople();
    return { code: 200, message: '查询成功', data };
  }

  @Post('/vote')
  async vote(@Body() params: { id: number }) {
    const people = await this.peopleService.findOnePeople(params.id);

    people.vote += 1;
    await this.peopleService.updatePeople(params.id, people);

    return { code: 200, message: '投票成功' };
  }
}
