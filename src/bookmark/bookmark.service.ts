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

    // getBookMarks
    getBookmarks(userIds: string) {
        return this.prisma.bookmark.findMany({
            where: {
                userIds,
            }
        })
    }

    // getBookmarksById
    getBookmarkById(userIds: string, bookmarkId: string) {
        return this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userIds,
            }
        })
    }

    // CreateBookmark
    async createBookmark(
        userIds: string,
        dto: CreateBookmarkDto,
    ) {
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userIds: userIds,
                ...dto,
            },
        });

        return bookmark;
    }

    // EditBookmarkId
    async editBookmarkId (
        userIds: string,
        bookmarkId: string,
        dto: EditBookmarkDto,
    ) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
            }
        });

        if(!bookmark || bookmark.userIds !== userIds) {
            throw new ForbiddenException(
                "Access to resource deny!!!"
            );
        }


        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId,
            },
            data: {
                ...dto,
            },
        });
    }
}
