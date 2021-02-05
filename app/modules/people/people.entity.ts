import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('people')
export class PeopleEntity {
  /**
   * 自增主键
   */
  @PrimaryGeneratedColumn({
    comment: '自增ID',
  })
  id: number;

  /**
   * 项目 key
   */
  @Column({
    comment: '人物姓名',
    unique: true,
  })
  name: string;

  /**
   * 人物描述
   */
  @Column({
    comment: '人物描述',
  })
  desc: string;

  /**
   * 人物票数
   */
  @Column({
    comment: '人物票数',
  })
  vote: number;
}
