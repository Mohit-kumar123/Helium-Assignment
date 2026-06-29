import { RecommendationDto } from './recommendation.dto';
import { ShopperType } from '../../common/enums/shopper-type.enum';

export class AnalyzeResponseDto {
  shopperType!: ShopperType;

  confidence!: number;

  evidence!: string[];

  recommendation!: RecommendationDto;
}
