import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';
interface IComplimentsRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentsService {
  async execute({
    user_sender,
    message,
    tag_id,
    user_receiver,
  }: IComplimentsRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error('Incorrect User Receiver');
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error('User Receiver does not exists!');
    }

    const compliments = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepositories.save(compliments);

    return compliments;
  }
}

export { CreateComplimentsService };
