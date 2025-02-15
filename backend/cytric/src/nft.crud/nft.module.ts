import { Module } from "@nestjs/common";
import { NftService } from "./nft.service";
import { NftController } from "./nft.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Nft, NftSchema } from "src/Models/Nft.model";

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Nft.name, schema: NftSchema }]), // Register NFT Schema
    ],
    controllers:[NftController],
    providers:[NftService],
    exports:[NftService],
})
export class NftModule{

}
