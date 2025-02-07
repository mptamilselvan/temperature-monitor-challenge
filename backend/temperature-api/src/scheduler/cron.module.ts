import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
//import { CronController } from './cron.controller';
import { CronService } from './cron.service';

import { ScheduleModule } from '@nestjs/schedule'; // to run cron job
import { TemperatureEntity } from 'src/entities/temperature.entity';

//import { ReceiptModule } from 'src/receipt/receipt.module';

//import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemperatureEntity]),
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
