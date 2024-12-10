import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import { StatsModule } from './stats/stats.module';
import { providers } from './app.providers';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: `7d` },
    }),
    HttpModule,
    AuthModule,
    WeatherModule,
    StatsModule,

  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...providers
  ],
  exports: [
    ...providers
  ]

})
export class AppModule { }