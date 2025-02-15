import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { NftService } from "./nft.service";
import { Nft } from "src/Models/Nft.model";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateNftDto } from "./dto/nft.dto";



@Controller()
export class NftController {
    constructor(
        private nftService: NftService
    ) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new NFT' })
    @ApiBody({
        description: 'Create a new NFT',
        type: CreateNftDto, // Reference the DTO class
    })
    @ApiResponse({
        status: 201,
        description: 'The NFT has been successfully created.',
    })
    async create(@Body() createNftDto: CreateNftDto) {
        return this.nftService.create(createNftDto);
    }


    @Get("get_cycrib")
    list() {
        return this.nftService.list()
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        const nft = await this.nftService.delete(id);  // ID passed as string
        if (!nft) {
            throw new NotFoundException('NFT with this id not found');
        }
    }

    
}