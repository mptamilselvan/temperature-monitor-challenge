import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PublicService } from '../public/public.service';

@WebSocketGateway({
  cors: {
    origin: process.env.APP_URL, // React app URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class TemperatureGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private publicService: PublicService
    ) { }

  // Emit random temperature data every 3 seconds
  startEmittingTemperatureData() {
    
    const duration = process.env.WEATHER_API_INTERVAL ? Number(process.env.WEATHER_API_INTERVAL) * 1000:20000;
    console.log('duration',duration);
    setInterval(async() => {
      console.log('get live temperature ');
      const temperature = await this.publicService.getLiveTemperature();
      console.log(temperature);
      // Updating to database
      await this.publicService.addTemperature(temperature);
      console.log('emitting temperature ',temperature);
      this.server.emit('temperatureUpdate', { temperature });
    
    }, duration);
  }
  handleConnection() {
    console.log('Front end client connected');
    this.startEmittingTemperatureData();
  }
}
