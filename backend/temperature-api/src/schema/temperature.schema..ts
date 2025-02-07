import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn,UpdateDateColumn, DeleteDateColumn,   CreateDateColumn, ManyToOne, BeforeInsert, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Schema()
export class Temperature {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 12, scale: 2 , default:0 })
  temperature: number;

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
 

   @Prop()
   name: string;
   @Prop()
   roleNumber: number;
   @Prop()
   class: number;
   @Prop()
   gender: string;
   @Prop()
   marks: number;
}
export const TemperatureSchema = SchemaFactory.createForClass(Temperature);


