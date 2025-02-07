import { Controller, Get, HttpStatus,  Res, UseGuards } from '@nestjs/common';
import { PublicService } from './public.service';
import { ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CanAccess } from './public.access';
import { LiveTemperatureRes, TemperatureListRes } from './dto/response';

@Controller('public')
@ApiTags('Get Temperature')
export class PublicController {
   constructor(private readonly publicService: PublicService) { }

@Get('temperature')
@UseGuards(new CanAccess('temperature_live','read'))
@ApiQuery({name: 'token', required: true, description:"xxxx"})
@ApiOperation({
  summary:
    'Get real time temperature details',
})
@ApiCreatedResponse({ 
  description: `Live Temperature  details`,
  schema:{ 
    example:  LiveTemperatureRes
  }
})
async getTemperature(@Res() response) {
  try {
    const result = await this.publicService.getTemperature();
    return response.status(HttpStatus.OK).json({
    status: 'ok',data: result});
  } catch (err) {
    console.log(err);
    return response.status(err.status).json(err.response);
  }
}

@Get('temperatures')
@UseGuards(new CanAccess('temperatures','read'))
@ApiOperation({
  summary:
    'Get previous temperatures details with date time',
})
@ApiCreatedResponse({ 
  description: `Live Temperature  details`,
  schema:{ 
    example:  TemperatureListRes
  }
})
@ApiQuery({name: 'token', required: true, description:"xxxx"})
async getAllTemperatures(@Res() response) {
  try {
    const result = await this.publicService.getAllTemperatures();
    return response.status(HttpStatus.OK).json({
    status:'ok', data: result});
  } catch (err) {
    console.log(err);
    return response.status(err.status).json(err.response);
  }
}

}