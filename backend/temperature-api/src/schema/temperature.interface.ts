import { Document } from 'mongoose';
export interface TemperatureInter extends Document{
     temperature: number;
     latitude: number;
     langitude: number;
     status: number;
     area: string;
}