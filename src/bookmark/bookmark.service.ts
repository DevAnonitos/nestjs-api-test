import {
    ForbiddenException,
    Injectable
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
    CreateBookmarkDto,
    EditBookmarkDto
} from "./dto";

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

}
