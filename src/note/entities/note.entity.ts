import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class Note {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: string;

    @Prop({ type: String })
    id: string;

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: String })
    tag: string;

};
export const NotesSchema = SchemaFactory.createForClass(Note)
