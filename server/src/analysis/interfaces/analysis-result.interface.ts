import { ShopperType } from '../../common/enums/shopper-type.enum';
import { IRecommendation } from './recommendation.interface';

export interface IAnalysisResult {
  shopperType: ShopperType;

  confidence: number;

  evidence: string[];

  recommendation: IRecommendation;
}