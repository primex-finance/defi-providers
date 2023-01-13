import { Controller, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetTvlRequest,
  GetTvlReply,
  GetPoolAndTokenVolumesRequest,
  GetPoolAndTokenVolumesReply,
  GetTokenDetailsReply,
  GetTokenDetailsRequest,
} from './generated/dappradar-proto/defi-providers';
import { GenericRpcErrorFilter } from './genericRpcError';
import {
  HealthCheckRequest,
  HealthCheckResponse,
} from './generated/dappradar-proto/health';

@Controller()
@UseFilters(new GenericRpcErrorFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('DefiProviders', 'GetTvl')
  async getTvl(req: GetTvlRequest): Promise<GetTvlReply> {
    return await this.appService.getTvl(req);
  }

  @GrpcMethod('DefiProviders', 'GetPoolAndTokenVolumes')
  async getPoolAndTokenVolumes(
    req: GetPoolAndTokenVolumesRequest,
  ): Promise<GetPoolAndTokenVolumesReply> {
    return await this.appService.getPoolAndTokenVolumes(req);
  }

  @GrpcMethod('DefiProviders', 'GetTokenDetails')
  async getTokenDetails(
    req: GetTokenDetailsRequest,
  ): Promise<GetTokenDetailsReply> {
    return await this.appService.getTokenDetails(req);
  }

  @GrpcMethod('Health', 'Check')
  async checkServerStatus(
    req: HealthCheckRequest,
  ): Promise<HealthCheckResponse> {
    return { status: 1 };
  }
}
