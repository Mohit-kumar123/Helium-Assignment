import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';
import {EventType} from '../../common/enums/event-type.enum';

export class AnalyzeDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  events!: EventType[];
}
