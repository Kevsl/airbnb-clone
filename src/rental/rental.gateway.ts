import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { RentalService } from './rental.service';
import { Socket, Server } from 'socket.io';

@Injectable()
@WebSocketGateway(3333, { cors: true })
export class RentalGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(forwardRef(() => RentalService))
    private readonly rentalService: RentalService,
  ) {}

  @WebSocketServer() server: Server;

  async handleConnection() {
    this.server.emit('rentals', await this.rentalService.getAllRentals());
  }

  async handleDisconnect() {
    this.server.emit('rentals', await this.rentalService.getAllRentals());
    return;
  }

  @SubscribeMessage('newRental')
  async handleNewRentals(client: Socket, message: 'newRental') {
    console.log(message);
    client.emit('newRental', await this.rentalService.getAllRentals());
    this.server.emit('newRental', await this.rentalService.getAllRentals());
  }
}
