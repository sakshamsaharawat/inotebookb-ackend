import { GetUser } from '../decorator/user-decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { NoteService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/middleware/jwt-verify-middleware';
import { ListNoteDto } from './dto/list-user.dto';
import { Note } from './entities/note.entity';

@Controller('note')
export class NoteController {
  constructor(private readonly notesService: NoteService) { }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() createNoteDto: CreateNoteDto, @GetUser() user: User) {
    console.log(createNoteDto)
    return await this.notesService.create(createNoteDto, user);
  }

  @Post('/list')
  findAll(listUserDto: ListNoteDto): Promise<{ notes: Note[], totalCount: Number }> {
    return this.notesService.findAll(listUserDto);
  }

  @Post(':id')
  findNote(@Param('id') id: string) {
    return this.notesService.findNote(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
