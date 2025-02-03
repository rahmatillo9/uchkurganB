import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Search } from './search.entity';
import { User } from 'src/users/user.entity';

@Module({
     imports: [
            SequelizeModule.forFeature([Search, User]),
          ],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
