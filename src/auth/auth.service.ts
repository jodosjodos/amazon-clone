import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/userDetails.interface';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  //    register user
  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { name, email, password } = user;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) return 'email already registered';
    const hashedPassword = await this.hashPassword(password);
    const newUSer = await this.userService.createUser(
      name,
      email,
      hashedPassword,
    );
    return this.userService._getUserDetails(newUSer);
  }
}
