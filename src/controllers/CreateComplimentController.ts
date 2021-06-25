import { Request, Response } from 'express';
import { CreateComplimentsService } from '../services/CreateComplimentsService';

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { message, tag_id, user_receiver } = request.body;

    const { user_id } = request;

    const createComplimentService = new CreateComplimentsService();

    const compliment = await createComplimentService.execute({
      user_sender: user_id,
      message,
      tag_id,
      user_receiver,
    });

    return response.status(201).json(compliment);
  }
}

export { CreateComplimentController };
