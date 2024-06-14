import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ timestamps: true })
export class User {

    @Prop({ type: String, required: true, unique: true })
    id: string;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true, select: false })
    password: string;
}
export const UserSchema = SchemaFactory.createForClass(User)
