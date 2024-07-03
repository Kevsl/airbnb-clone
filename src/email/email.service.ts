import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Rental, User } from '@prisma/client';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: process.env.MAILER_SECURE === 'false',
      auth: {
        user: this.config.get('SMTP_EMAIL'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.config.get('SERVER_URL')}/activate?token=${token}`;

    const emailHtml = `<p>Hey ${user.name},</p>
        <p>Your requested an account creation on Hell Bnb</p>
            <a href='${url}'>You requested an account creation on Hell Bnb, click here 
            to activate your account</a>
        <p>If you did not request this email you can safely ignore it.</p>`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: 'Welcome user! Confirm your Email',
      html: emailHtml,
    });
  }

  async sendUserListingHasBeenCreated(user: User, rental: Rental) {
    const url = 'https://paypal.com/donnerAKevin';
    const emailBody = `
        <p>Hey ${user.name}</p>
        <p>You have created a new listing with the following information:</p>
            <a href='${url}'>Name:${rental.name}</a>
        <p>Price : ${rental.price} euros</p>
        <p>Description: ${rental.description}</p>
        <p>Thank you for using our service!
        Best regards,
       </p>
    `;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: 'Welcome user! Confirm your Email',
      html: emailBody,
    });
  }
}
