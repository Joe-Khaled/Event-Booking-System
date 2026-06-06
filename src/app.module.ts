import { Module } from '@nestjs/common';
import { EventModule } from './modules/event/event.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { UserModule } from './modules/user/user.module';
import { VenueModule } from './modules/venue/venue.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'event_management',
      synchronize: true,
      autoLoadEntities: true,
    }),
    EventModule, PaymentModule, ReservationModule, TicketModule, UserModule, VenueModule
  ]
})
export class AppModule { }
