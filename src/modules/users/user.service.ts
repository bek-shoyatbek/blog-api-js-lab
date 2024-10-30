import bcrypt from 'bcrypt';
import { User, UserRole } from '../../common/database/entities/user.entity';
import { userRepository } from '../../common/database';

export class UserService {

    static async findUserByEmail(email: string): Promise<User | null> {
        return userRepository.findOneBy({ email });
    }

    static async updateUserRole(userId: string, newRole: UserRole): Promise<User> {
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        user.role = newRole;
        return userRepository.save(user);
    }


    static async updateUser(userId: string, data: {
        name?: string;
        email?: string;
        password?: string;
    }): Promise<User> {
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        if (data.email && data.email !== user.email) {
            const existingUser = await userRepository.findOneBy({ email: data.email });
            if (existingUser) {
                throw new Error('Email already in use');
            }
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        Object.assign(user, data);
        return userRepository.save(user);
    }


    static async deleteUser(userId: string): Promise<void> {
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        await userRepository.remove(user);
    }

    static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await this.validatePassword(user, currentPassword);

        if (!isValidPassword) {
            throw new Error('Current password is incorrect');
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await userRepository.save(user);
    }

    static async validatePassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }
}