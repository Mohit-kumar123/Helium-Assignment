import { Body, Controller, Post } from '@nestjs/common';
import {AnalysisService} from './analysis.service';
import {AnalyzeDto} from './dto/analyze.dto';

@Controller('analysis')
export class AnalysisController {
    constructor(
        private readonly analysisService: AnalysisService,
    ){}

    @Post()
    analyze(@Body() analyzeDto: AnalyzeDto){
        return this.analysisService.analyze(analyzeDto);
    }
}
