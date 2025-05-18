import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(userId: number): Promise<User>;
    create(user: Partial<User>): Promise<User>;
    update(userId: number, user: Partial<User>): Promise<User>;
    remove(userId: number): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}
