import { Test, TestingModule } from '@nestjs/testing';
import { PublicController } from './public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicService } from './public.service';
import { Temperature } from 'src/schema/temperature.schema.';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('PublicController', () => {
  let controller: PublicController;
  let config = new ConfigService;

  const publicService = new PublicService(config);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicController],
      providers: [PublicService],
    })
    .overrideProvider(PublicService)
    .useValue(publicService)
    .compile();

    controller = module.get<PublicController>(PublicController);
  });

   
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get live temperature', async () => {
    console.log('TEST RESULT:1');
    const testRes = await publicService.getTemperature();
    console.log('testRes:',testRes);
    expect(testRes.status).toEqual('ok');

  });

  it('get all temperatures', async () => {
    console.log('TEST RESULT:1');
    const testRes = await publicService.getAllTemperatures();
    console.log('testRes:',testRes);
    expect(testRes.status).toEqual('ok');
  });

});
