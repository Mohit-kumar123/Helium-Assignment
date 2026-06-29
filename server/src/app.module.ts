import { Module } from '@nestjs/common';
import { AnalysisModule } from './analysis/analysis.module';
import { GeminiModule } from './gemini/gemini.module';
import { PromptModule } from './prompt/prompt.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AnalysisModule, GeminiModule,HealthModule, PromptModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
})
export class AppModule {}
