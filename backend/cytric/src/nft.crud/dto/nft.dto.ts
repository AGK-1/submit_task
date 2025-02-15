import { ApiProperty } from '@nestjs/swagger';

export class CreateNftDto {
  @ApiProperty({ description: 'The name of the NFT' })
  name: string;

  @ApiProperty({ description: 'The description of the NFT' })
  description: string;

  @ApiProperty({ description: 'The logo URL for the NFT' })
  logoUrl: string;

  @ApiProperty({ description: 'The unique ID of the NFT' })
  nftId: number;

  @ApiProperty({ description: 'The user\'s wallet address' })
  userWalletAddress: string;
}
