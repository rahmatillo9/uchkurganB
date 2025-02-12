import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { CreateUsersDto, UpdateUserDto } from 'src/validators/users.validator';
// import { InjectQueue } from '@nestjs/bull';
// import { Queue } from 'bull';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    // @InjectQueue('hash-queue') private hashQueue: Queue, // Hash queue injection
  ) {}

  async create(createUserDto: CreateUsersDto) {
    // Parolni hash qilish
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
  
    // Yangi foydalanuvchi yaratish
    return this.userModel.create({
      ...createUserDto,
      password: hashPassword, // Hashlangan parolni saqlash
    } as User);
  }
  

  async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword); 
  }

    async findBynickname(nickname: string) {
        return this.userModel.findOne({ where: { nickname } });
    }

    async findAll(): Promise<User[]>{
      
        return this.userModel.findAll({
          order: [['createdAt', 'DESC']],
        });
    
      }

      async findOne(id: number) {
        const user = await this.userModel.findByPk(id);
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      }

      async update(id: number, updateUserProfileDto: UpdateUserDto): Promise<User>{
        const userProfile = await this.userModel.findByPk(id);
        if(!userProfile){
            throw new NotFoundException(`User Profile ID: ${id} not found`);
        }
        return userProfile.update(updateUserProfileDto);
    }

    

    async deleteUser(id: number): Promise<void>{
        const user = await this.userModel.findOne({ where: { id } });
        if(user){
            await user.destroy();
        }
    }

}
