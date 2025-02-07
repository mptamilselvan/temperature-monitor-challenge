import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { AddTemperatureDto } from './dto/validation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemperatureEntity } from '../entities/temperature.entity';
import { Lib } from '../utils/lib';
import { TemparatureFeels, TemparatureTypes } from '../enum/enum';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, throwError, timeout } from 'rxjs';

@Injectable()
export class PublicService {
  @InjectRepository(TemperatureEntity)
  private temperatureRepository: Repository<TemperatureEntity>;
  
constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService
  ) { }

/**
 * Get live temparature
 * @returns temperature, type,feel as array
 */
async getTemperature(): Promise<any> {

    const temperature = await this.getLiveTemperature();
    const res = await this.addTemperature(temperature);
    return {
      temperature: temperature.temperature,
      type: temperature.type,
      feel: temperature.feel,

    };
 }
/**
 * Get Live temperature only returns live data
 * @returns result [ temperature, feel, type, time_difference, created_at]
 */
async getLiveTemperature(): Promise<any> {
   
  const WEATHER_API_URL=process.env.WEATHER_API_URL??'';

  try {
    //const response = await lastValueFrom(this.httpService.get(WEATHER_API_URL));
    const response = await lastValueFrom(
      this.httpService.get(WEATHER_API_URL).pipe(
        timeout(5000), 
        catchError((error) => {
          console.log('Error',error);
          /*
          if (error.name === 'TimeoutError') {
            throw new HttpException(
              'Request timed out',
              HttpStatus.REQUEST_TIMEOUT,
            );
          }
          return throwError(() => error);
          */
          //return error;
          return throwError(() => error);
        }),
      ),
    );

    console.log('weather api response',response);
    
    if(response && response.data.current) {
      const temperature = response.data.current.temperature_2m;
      //const temperature = await Lib.generateNumber(50,90);
      const currentTime = await Lib.getCurrentTime();
      const type = TemparatureTypes.C; 
      let feel= TemparatureFeels.NORMAL;
      console.log('temperature', temperature);
      const temperature_feel_max = process.env.TEMPERATURE_FEEL_MAX ? Number(process.env.TEMPERATURE_FEEL_MAX):0;
      if(temperature>temperature_feel_max) {
        feel= TemparatureFeels.HIGH;
      }
      const time_difference = await this.getTimeDifference(currentTime);
      const result = {
        temperature,
        type,
        feel,
        time_difference,
        latitude:response.data.current.latitude,
        langitude: response.data.current.langitude,
        area: 'bangalore'
      }
      if (!result) {
        //throw new NotFoundException(`No data found`);
        return false;
      }
      return result;
   }
  } catch (error) {
    //throw new Error(`Failed to fetch data: ${error.message}`);
    console.log(`Failed to fetch data: ${error.message}`);
    return false;
  }
}
/**
 * Add temperature details into database
 * @param temperature 
 * @returns 
 */
async addTemperature(temperature:any): Promise<any> {

  console.log('adding temperature...');
  const addTemperatureDto = new AddTemperatureDto;
  addTemperatureDto.temperature = temperature.temperature;
  addTemperatureDto.langitude = temperature.langitude;
  addTemperatureDto.latitude = temperature.latitude;
  addTemperatureDto.type = temperature.type;
  addTemperatureDto.feel = temperature.feel;
  addTemperatureDto.area = temperature.area;
  addTemperatureDto.status=1;
  addTemperatureDto.created_at= await Lib.getCurrentDateTime();
  console.log(addTemperatureDto);
  const res = await this.temperatureRepository.save(
    this.temperatureRepository.create(addTemperatureDto)
  );

  console.log(res);
  return res;
}
/**
 * Get all previous temeratures list
 * @returns 
 */
async getAllTemperatures(): Promise<any> {

  const limit = 10;
  const res = await this.temperatureRepository.find ({
    select: ["temperature","type","feel","created_at"],
    order: {
      created_at: 'DESC',
    },
    take: limit,
  });
  // console.log(res);
  if (!res) {
      // throw new NotFoundException('No data found!');
      console.log('No data found');
      return false;
  }
  const updatedRes = await Promise.all(
    res.map(async (temp) => {
      const time_difference = await Lib.getDatetimeDifference(new Date(temp.created_at), new Date())
      return { ...temp, time_difference };
    })
  );
  return updatedRes;
 
}
/**
 * To get time difference from previous process
 * @param updatedTime 
 * @returns 
 */
async getTimeDifference(updatedTime): Promise<any> {
   
   const timeDiff = await Lib.getDatetimeDifference(new Date(updatedTime),new Date()); 
   console.log('time diff', timeDiff);
   return timeDiff;

}

}