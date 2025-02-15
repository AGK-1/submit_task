import { Delete, Injectable, NotFoundException, Param } from "@nestjs/common";
import { NftSchema } from "src/Models/Nft.model";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nft, NftDocument } from 'src/Models/Nft.model';


@Injectable()
export class NftService {
    constructor(@InjectModel(Nft.name) private nftModel: Model<NftDocument>) { }

    async create(params: Partial<Nft>): Promise<Nft> {
        const nft = new this.nftModel(params);
        await nft.save();
        return nft;
    }

    list() {
        return this.nftModel.find({})
    }


    async delete(id: string): Promise<Nft | null> {
        const nft = await this.nftModel.findOne({ _id: id });  // `id` is treated as string here
    
        if (!nft) {
            return null;  // Return null if not found
        }
    
        await nft.deleteOne();  // Delete the NFT
        return nft;  // Optionally return the deleted nft
    }
}