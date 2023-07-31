import {
    ForbiddenException,
    Injectable
} from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import {
    CreateBookmarkDto,
    EditBookmarkDto
} from "./dto";

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    // CreateBookmark
    async createBookmark(
        userIds: [],
        dto: CreateBookmarkDto,
    ) {
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userIds,
                ...dto,
            },
        });

        return bookmark;
    }
}
