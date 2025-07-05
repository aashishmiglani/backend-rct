import twilio from 'twilio';
import dotenv from 'dotenv';
 // Ensure this path is correct

dotenv.config(); // load variables from .env

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const fromSMSNumber = process.env.TWILIO_PHONE_NUMBER;

export const twilioClient = twilio(accountSid, authToken);
