import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import {
    CreateBookmarkDto,
    EditBookmarkDto
} from "./dto";
import { BookmarkService } from "./bookmark.service";

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookMarkController {
    // Create constructor bookMarkService
    constructor(private bookmarkService: BookmarkService) {}

    //route GetBookmarks
    @Get('getBookmarks')
    getBookmarks(@GetUser('id') userIds: string) {
        return this.bookmarkService.getBookmarks(
            userIds,
        );
    }

    // Route getBookmarksById
    @Get(":id")
    getBookmarkById(
        @GetUser('id') userIds: string,
        @Param('id') bookmarkId: string
    ) {
        return this.bookmarkService.getBookmarkById(
            userIds,
            bookmarkId,
        );
    }

    // route createBookmarks
    @Post('createBookmarks')
    createBookmark(
        @GetUser('id') userIds: string,
        @Body() dto: CreateBookmarkDto
    ) {
        return this.bookmarkService.createBookmark(
            userIds,
            dto,
        );
    }


}
