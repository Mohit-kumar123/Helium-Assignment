import { ShopperType } from '../../common/enums/shopper-type.enum';
import { IRecommendation } from './recommendation.interface';

export interface IGeminiResponse {

    shopperType: ShopperType;

    confidence: number;

    evidence: string[];

    recommendation: IRecommendation;

}