import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { TemperatureSchema } from './schema/temperature.schema.';
import { CronModule } from './scheduler/cron.module';
import { CronService } from './scheduler/cron.service';
import { PublicModule } from './public/public.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureEntity } from './entities/temperature.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TemperatureGateway } from './temperature/temperature.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PublicModule,
    CronModule,
   // MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'tmc'}),
   // MongooseModule.forFeature([{ name: 'Temperature', schema: TemperatureSchema }])
   
   TypeOrmModule.forRoot({
    type: 'mongodb',
    url: process.env.DATABASE_URL,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [TemperatureEntity],
  }),


/*
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: configService.get<string>('DATABASE_TYPE'),
      url: configService.get<string>('DATABASE_URL'),
      useUnifiedTopology: true,
      synchronize: true,
    }),
  }),
  */

  TypeOrmModule.forFeature([TemperatureEntity]),
  ScheduleModule.forRoot()

  ],
  controllers: [AppController],
  providers: [AppService, TemperatureGateway],
})
export class AppModule {}
