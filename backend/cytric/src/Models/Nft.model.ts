import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import * as mongoose from 'mongoose';

export type NftDocument = Nft & Document;

@Schema({ timestamps: true })
export class Nft {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false})
  logoUrl: string;

  @Prop({ required: true, unique: true, index: true })
  nftId: number;

  @Prop({ required: false })
  userWalletAddress: string;
}

export const NftSchema = SchemaFactory.createForClass(Nft);

NftSchema.pre('save', async function(next) {
  try {
    const doc = this as NftDocument;
    
    if (!doc.isNew) {
      return next();
    }

    const Model = this.constructor as Model<NftDocument>;
    const lastNft = await Model.findOne()
      .sort({ nftId: -1 })
      .exec();

    doc.nftId = lastNft ? lastNft.nftId + 1 : 1;
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new mongoose.Error(error.message));
    } else {
      next(new mongoose.Error('An unknown error occurred while generating nftId'));
    }
  }
});