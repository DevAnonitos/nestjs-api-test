import {
    Body,
    Controller,
    Get,
    Patch,
    UseGuards
} from "@nestjs/common";
import { User } from "@prisma/client";
import { UserService } from "./user.service";
import { GetUser } from "../auth/decorator";
import { EditUserDto } from "./dto";
import { JwtGuard } from "../auth/guard";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('user')
    getUsers(@GetUser() user: User) {
        return user;
    }

    @Patch()
    editUser(
        @GetUser('id') userId: string,
        @Body() dto: EditUserDto,
    ) {
        console.log({
            message: dto,
        })
        return this.userService.editUser(userId, dto);
    }
}
