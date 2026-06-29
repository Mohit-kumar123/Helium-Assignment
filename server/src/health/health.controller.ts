import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {

  @Get()
  checkHealth() {
    return {
      status: 'OK',
      service: 'ShopperSense AI Backend',
      timestamp: new Date().toISOString(),
    };
  }
}