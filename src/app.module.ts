import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string, {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        cors: true,
        debug: true,
        playground: true,
        autoSchemaFile: 'src/schema.gql',
        autoTransformHttpErrors: true,
      }),
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
