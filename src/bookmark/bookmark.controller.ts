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
    
}
