import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { TemperatureEntity } from 'src/entities/temperature.entity';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([TemperatureEntity])
   //  MongooseModule.forFeature([ { name: 'Temperature', schema: TemperatureSchema }])
  ],
  controllers: [PublicController],
  providers: [PublicService],
  exports: [PublicService],
})
export class PublicModule {}
