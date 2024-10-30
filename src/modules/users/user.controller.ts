import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserRole } from '../../common/database/entities/user.entity';
import { AuthRequest } from '../../types';

export class UserController {
    static async promoteUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user = await UserService.updateUserRole(userId, UserRole.ADMIN);
            res.json({ message: 'User promoted successfully', user });
        } catch (error: any) {
            res.status(400).json({ message: error?.message });
        }
    }

    static async demoteUser(req: AuthRequest, res: Response) {
        try {
            const { userId } = req.params;
            await UserService.updateUserRole(userId, UserRole.USER);
            res.json({ message: "Admin demoted to user successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error demoting user" });
        }
    }

}