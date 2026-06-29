import { Injectable } from '@nestjs/common';
import { AnalyzeDto } from './dto/analyze.dto';
import { PromptService } from 'src/prompt/prompt.service';
import { GeminiService } from 'src/gemini/gemini.service';
import { ParserService } from 'src/parser/parser.service';
import { IAnalysisResult } from './interfaces/analysis-result.interface';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly promptService: PromptService,
    private readonly geminiService: GeminiService,
    private readonly parserService: ParserService,
  ) {}
  async analyze(analyzeDto: AnalyzeDto): Promise<IAnalysisResult> {
    try {
      const prompt = this.promptService.buildPrompt(analyzeDto.events);

      const rawResponse = await this.geminiService.generate(prompt);

      return this.parserService.parse(rawResponse);
    } catch (error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }
}
