import { resolve } from "node:dns";

export class SendEmailHandler {
  async handler(job: any) {
    console.log("Sending Email...");
    console.log(job.payload);

    await new Promise((resolve) => 
      setTimeout(resolve,1000)
    );

    console.log("Email Sent");
    // throw new Error("SMTP Error");
  }
}