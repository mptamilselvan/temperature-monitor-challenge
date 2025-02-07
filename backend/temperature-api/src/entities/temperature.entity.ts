import { Column, Entity, PrimaryGeneratedColumn,  UpdateDateColumn, DeleteDateColumn,   CreateDateColumn, OneToMany, JoinColumn, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { EntityRelationalHelper } from '../utils/relational-entity-helper';
import { Exclude } from 'class-transformer';
import { TemparatureFeels, TemparatureTypes } from '../enum/enum';

@Entity('temperature')
export class TemperatureEntity extends EntityRelationalHelper {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('decimal', { precision: 12, scale: 2 , default:0 })
  temperature: number;

  @Column({
    type: "enum",
    enum: TemparatureTypes,
    default: TemparatureTypes.C
  })
  type: string | null;

  @Column({
    type: "enum",
    enum: TemparatureFeels,
    default: TemparatureFeels.NORMAL
  })
  feel: string | null;

  @Column('decimal', { precision: 15, scale: 2 , default:0 })
  latitude: number;

  @Column('decimal', { precision: 15, scale: 2 , default:0 })
  langitude: number;

  @Column('varchar', { length:100, nullable: true })
  area: string | null;
 
  @Column('int4', { name: 'status', nullable: true })
  status: number;
 
  @Column('int4', { name: 'created_user_id', nullable: true })
  created_user_id: number;

  @Column('int4', { name: 'updated_user_id', nullable: true })
  updated_user_id: number;
  
  @CreateDateColumn()
  @Column('timestamp', { name: 'created_at', nullable: true })
  created_at: Date;

  @UpdateDateColumn()
  @Column('timestamp', { name: 'updated_at', nullable: true })
  updated_at: Date;

  @Column('boolean', { default:false, nullable: false })
  deleted: boolean;
  
  @DeleteDateColumn()
  @Column('timestamp', { name: 'deleted_at', nullable: true })
  deleted_at: Date;
 
  @Exclude()
  __entity: any;
 

  
}