import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './entities/note.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/entities/user.entity';
import { ListNoteDto } from './dto/list-user.dto';


@Injectable()
export class NoteService {
  constructor(
    @InjectModel('Note')
    private readonly noteModel: Model<Note>,
    // private jwtService: JwtService,
    // private readonly configService: ConfigService
  ) { }
  async create(createNoteDto: CreateNoteDto, user: User) {
    if (!user || !user.id) {
      throw new BadRequestException('User not found or invalid');
    }

    const isIdExist = await this.noteModel.findOne({ id: createNoteDto.id })
    if (isIdExist) {
      throw new BadRequestException('Id already exist.')
    }
    const id = uuidv4();
    const newNote = new Note()
    newNote.id = id;
    newNote.title = createNoteDto.title;
    newNote.description = createNoteDto.description;
    newNote.tag = createNoteDto.tag;
    console.log(user.id)
    newNote.user = user.id;
    await this.noteModel.create(newNote);
    return { success: true, message: "Note created successfully" }
  }

  async findAll(listUserDto: ListNoteDto): Promise<{ notes: Note[], totalCount: Number }> {
    const notes = await this.noteModel.find(listUserDto)
    const totalCount = await this.noteModel.countDocuments()
    return { notes, totalCount }
  }

  async findNote(id: string): Promise<Note> {
    const note = await this.noteModel.findOne({ id })
    if (!note) {
      throw new BadRequestException('Note not found')
    }
    return note
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<{}> {
    const note = await this.noteModel.findOne({ id })
    if (!note) {
      throw new BadRequestException('Note not found.')
    }
    return await this.noteModel.updateOne({ id }, {
      $set: {
        title: updateNoteDto.title,
        description: updateNoteDto.description,
        tag: updateNoteDto.tag
      }
    }, { new: true })
  }
  async remove(id: string) {
    const note = await this.noteModel.findOne({ id })
    if (!note) {
      throw new BadRequestException('Note not found.')
    }
    return await this.noteModel.findOneAndDelete({ id }), {
      success: true, message: 'Note deleted successfully.'
    }
  }
}
