import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { PromptModule } from 'src/prompt/prompt.module';
import { GeminiModule } from 'src/gemini/gemini.module';
import { ParserModule } from 'src/parser/parser.module';

@Module({
  imports: [
    PromptModule,
    GeminiModule,
    ParserModule
  ],

  controllers: [AnalysisController],

  providers: [AnalysisService],
})
export class AnalysisModule {}
