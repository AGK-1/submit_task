import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModule } from './nft.crud/nft.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env', }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('DATABASE_URL');

        if (!uri) {
          Logger.error('❌ DATABASE_URL is missing in .env file', 'Database');
          throw new Error('DATABASE_URL not found');
        }

        Logger.log(`Connecting to MongoDB: ${uri}`, 'Database');

        return {
          uri,
          connectionFactory: (connection) => {
            connection.on('connected', () => {
              Logger.log('✅ MongoDB Connected Successfully!', 'Database');
            });

            connection.on('error', (err) => {
              Logger.error(`❌ MongoDB Connection Error: ${err.message}`, 'Database');
            });

            return connection;
          },
        };
      },
    }),
    NftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
