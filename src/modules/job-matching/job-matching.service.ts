import _ from 'lodash';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MESSAGES } from 'src/common/constants/message.constant'

import { JobsMatchingEntity } from 'src/entities/jobs-matching.entity'
import { JobsEntity } from 'src/entities/jobs.entity'
import { UsersEntity  } from 'src/entities/users.entity'

@Injectable()
export class JobMatchingService {
  constructor(
    @InjectRepository(JobsMatchingEntity) private jobsMatchingRepository: Repository<JobsMatchingEntity>,
    @InjectRepository(JobsEntity) private jobsRepository: Repository<JobsEntity>,
    @InjectRepository(UsersEntity) private UserRepository: Repository<UsersEntity>,
  ) {}

  async create(customerId : number, jobsId : number) {
    const verifyUserbyId = await this.UserRepository.findOne({
      where: {
        id : customerId
      },
    })
    if (verifyUserbyId === undefined || verifyUserbyId === null) {
      throw new NotFoundException(MESSAGES.USERS.COMMON.NOT_FOUND);
    }

    const verifyJobbyId = await this.jobsRepository.findOne({
      where: {
        id : jobsId,
        deletedAt : null
      },
    })
    if (verifyJobbyId === undefined || verifyJobbyId === null) {
      throw new NotFoundException(MESSAGES.JOBS.NOT_EXISTS);
    }

    const data = await this.jobsMatchingRepository.save({
      customerId,
      jobId : jobsId,
      matchedYn : false,
      rejectedYn : false,
    })

    return data;

  }

  async findAll(userId : number) {
    const data = await this.jobsMatchingRepository.find({
      where: {
        customerId : userId,
        deletedAt : null,
      },
    })

    return data;
  }

  async findOne(matchingId: number) {
    const data = await this.jobsMatchingRepository.findOne({
      where: {
        id : matchingId,
      },
    })

    return data;
  }

  async updateMatchYn(customerId: number, matchingId: number) {
    const matching = await this.jobsMatchingRepository.findOneBy({ id : matchingId });
    if (matching === undefined || matching === null) {
      throw new NotFoundException(MESSAGES.JOBMATCH.NOT_EXISTS);
    }
    if (matching.customerId !== customerId) {
      throw new BadRequestException(MESSAGES.JOBMATCH.MATCHING.NOT_VERIFY);
    }

    return await this.jobsMatchingRepository.update({ id : matchingId }, 
      {
        matchedYn : true,
      });
  }

  async updateRejectYn(customerId: number, matchingId: number) {
    const matching = await this.jobsMatchingRepository.findOneBy({ id : matchingId });
    if (matching === undefined || matching === null) {
      throw new NotFoundException(MESSAGES.JOBMATCH.NOT_EXISTS);
    }
    if (matching.customerId !== customerId) {
      throw new BadRequestException(MESSAGES.JOBMATCH.REJECT.NOT_VERIFY);
    }

    return await this.jobsMatchingRepository.update({ id : matchingId }, 
      {
        rejectedYn : true,
      });
  }

  async remove(customerId: number, matchingId: number) {
    const matching = await this.jobsMatchingRepository.findOneBy({ id : matchingId });
    if (matching === undefined || matching === null) {
      throw new NotFoundException(MESSAGES.JOBMATCH.NOT_EXISTS);
    }
    if (matching.customerId !== customerId) {
      throw new BadRequestException(MESSAGES.JOBMATCH.DELETE.NOT_VERIFY);
    }

    return await this.jobsMatchingRepository.softRemove({ id : matchingId });
  }
}
