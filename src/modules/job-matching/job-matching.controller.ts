import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { JwtAccessGuards } from "src/modules/auth/common/jwt-strategy";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestJwt } from "src/common/customs/decorators/jwt-request";
import { MESSAGES } from 'src/common/constants/message.constant'
import { JobMatchingService } from './job-matching.service';



@ApiTags('job-matching')
@ApiBearerAuth()
@UseGuards(JwtAccessGuards)
@Controller('job-matching')
export class JobMatchingController {
  constructor(private readonly jobMatchingService: JobMatchingService) {}

  /**
   * job-matching 생성
   * @param userId
   * @param jobsId
   * @returns
   */
  @Post(':jobsId')
  async create(@RequestJwt() { user: { id: userId }}, @Param('jobsId') jobsId: string) {

    const createMatching = await this.jobMatchingService.create(+userId, +jobsId);

    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.JOBMATCH.CREATE.CREATE_SUCCEED,
      createMatching
    };
  }

  /**
   * job-matching 목록조회
   * @param userId
   * @returns
   */
  @Get()
  async findAll(@RequestJwt() { user: { id: userId }}) {
    const Matching = await this.jobMatchingService.findAll(+userId);

    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.JOBMATCH.READ.READ_SUCCEED,
      Matching
    };
  }

  /**
   * job-matching 상세조회
   * @param matchingId
   * @returns
   */
  @Get(':matchingId')
  async findOne(@Param('matchingId') matchingId: string) {
    const Matching = await this.jobMatchingService.findOne(+matchingId);

    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.JOBMATCH.READ.READ_SUCCEED,
      Matching
    };
  }
  

  /**
   * job-matching 승락
   * @param matchingId
   * @param userId
   * @returns
   */
  @Patch('accept/:matchingId')
  async updateMatchYn(@Param('matchingId') matchingId: string, @RequestJwt() { user: { id: userId }}) {

    const Matching = await this.jobMatchingService.updateMatchYn(+userId, +matchingId);

    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.JOBMATCH.MATCHING.MATCHING_SUCCEED,
      Matching
    };
  }

  /**
   * job-matching 거절
   * @param matchingId
   * @param userId
   * @returns
   */
  @Patch('reject/:matchingId')
  async updateRejectYn(@Param('matchingId') matchingId: string, @RequestJwt() { user: { id: userId }}) {

    const Matching = await this.jobMatchingService.updateRejectYn(+userId, +matchingId);

    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.JOBMATCH.REJECT.REJECT_SUCCEED,
      Matching
    };
  }

  /**
   * job-matching 삭제
   * @param matchingId
   * @param userId
   * @returns
   */
  @Delete(':matchingId')
  async remove(@Param('matchingId') matchingId: string, @RequestJwt() { user: { id: userId }}) {

    const Matching = await this.jobMatchingService.remove(+userId, +matchingId);

    return {
      statusCode: HttpStatus.CREATED,
      message: MESSAGES.JOBMATCH.DELETE.DELETE_SUCCEED,
      Matching
    };
  }
}
