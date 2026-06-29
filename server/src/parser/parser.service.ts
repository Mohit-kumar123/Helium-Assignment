import { BadRequestException, Injectable } from '@nestjs/common';
import { IAnalysisResult } from '../analysis/interfaces/analysis-result.interface';
import { IGeminiResponse } from '../analysis/interfaces/gemini-response.interface';

@Injectable()
export class ParserService {
  parse(response: string): IAnalysisResult {
    try {
      const cleanedResponse = response
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleanedResponse);

      this.validate(parsed);

      return parsed;
    } catch (error) {
      throw new BadRequestException('Invalid response received from Gemini.');
    }
  }

  private validate(data: IGeminiResponse): void {
    if (!data.shopperType) {
      throw new Error('shopperType missing');
    }

    if (typeof data.confidence !== 'number') {
      throw new Error('confidence missing');
    }

    if (!Array.isArray(data.evidence)) {
      throw new Error('evidence missing');
    }
    if (!data.recommendation) {
      throw new Error('recommendation missing');
    }

    if (!data.recommendation.title) {
      throw new Error('recommendation title missing');
    }

    if (!data.recommendation.primaryAction) {
      throw new Error('primaryAction missing');
    }

    if (!data.recommendation.secondaryAction) {
      throw new Error('secondaryAction missing');
    }

    if (!data.recommendation.reasoning) {
      throw new Error('reasoning missing');
    }
  }
}
