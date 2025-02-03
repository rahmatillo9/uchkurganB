import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as bcrypt from 'bcryptjs';

@Processor('hash-queue')
export class HashQueue {
  @Process()
  async hashPassword(job: Job) {
    return await bcrypt.hash(job.data.password, 10);
  }
}
