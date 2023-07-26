import {
    Body,
    Controller,
    Get,
    Patch,
    UseGuards
} from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Patch()
    editUser() {
        return {
            message:'success',
        }
    }
}
