import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { RentalService } from './rental.service';

@WebSocketGateway(3333, { cors: true })
export class RentalGateway {
  // J'ajoute rentalService dans l'injection de dépendance pour pouvoir ensuite utiliser prisma.
  constructor(private readonly rentalService: RentalService) {}

  @SubscribeMessage('newRental')
  // La fonction handleNewRentals sera appelée à chaque
  // fois qu'un message est reçu.
  handleNewRentals(@MessageBody() message: any) {
    console.log(message);
  }
}
