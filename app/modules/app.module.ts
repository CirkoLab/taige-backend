import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewModule } from './view/view.module';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ViewModule, PeopleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
