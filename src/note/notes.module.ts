import { Module } from '@nestjs/common';
import { NoteService } from './notes.service';
import { NoteController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesSchema } from './entities/note.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        try {
          const secret = config.get<string>('JWT_SECRET');
          const expiresIn = config.get<string | number>('EXPIRES_IN');

          if (!secret || !expiresIn) {
            throw new Error('JWT configuration missing in application config');
          }

          return {
            secret,
            signOptions: { expiresIn },
          };
        } catch (error) {
          throw new Error(`Failed to configure JWT: ${error.message}`);
        }
      },
    }), MongooseModule.forFeature([{ name: 'Note', schema: NotesSchema }])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NotesModule { }
