import { Stream } from 'openai/streaming';
import {
  MessageModel,
  SendMessage,
  SendMessageModel,
  Encrypter,
  SendMessageRepository,
  UseCaseMessageModel,
  ContextId,
  ArtificialIntelligence,
} from './db-send-message-protocols';
import { ChatCompletion, ChatCompletionChunk } from 'openai/resources';

export class DbSendMessage implements SendMessage {
  private readonly encrypter: Encrypter;
  private readonly sendMessageRepository: SendMessageRepository;
  private readonly contextId: ContextId;
  private readonly ai: ArtificialIntelligence;

  constructor(
    encrypter: Encrypter,
    sendMessageRepository: SendMessageRepository,
    contextId: ContextId,
    ai: ArtificialIntelligence,
  ) {
    this.encrypter = encrypter;
    this.sendMessageRepository = sendMessageRepository;
    this.contextId = contextId;
    this.ai = ai;
  }

  async send({
    message,
    context_id,
    author,
  }: SendMessageModel): Promise<UseCaseMessageModel> {
    const hashedMessage = await this.encrypter.encrypt(message);
    const generatedContextId = await this.contextId.generate(context_id);

    await this.sendMessageRepository.send({
      context_id: generatedContextId,
      message: hashedMessage,
      author,
    });

    const getContext =
      await this.sendMessageRepository.findMessageByContextId(context_id);

    console.log(getContext);

    //   let formatContext;
    //   formatContext = [`Author: ${author}, Message: ${message}`];
    //   if (context_id) {
    //     formatContext = await Promise.all(
    //       getContext.map(async (context) => {
    //         const { message, author } = context;
    //         const messageDecrypt = await this.encrypter.decrypt(message);
    //         return `Author: ${author}, Message: ${messageDecrypt}`;
    //       }),
    //     );
    //   }
    //   const order = `
    //  Prompt:

    //     Atendimento de Chamados

    //     Um cliente solicita atendimento para relatar um incidente. O atendente deve conduzir a interação seguindo um script predefinido e utilizar o contexto das mensagens do cliente para orientar a conversa.

    //     Script do Atendimento:

    //     Identificação:
    //     Olá, bem-vindo ao serviço de atendimento de chamados. Posso saber seu nome para registrarmos o relato?

    //     Pessoas Envolvidas:
    //     - Por favor, descreva quem está envolvido no incidente.
    //     - Caso entre o nome de uma pesso envolvida, considere como a pessoa envolvida e não como o nome do relatante

    //     Data do Ocorrido:
    //      Quando ocorreu o incidente?

    //     Revisão de Informações Anteriores:
    //     mostre todas as informacoes que ele passou

    //     Agradecimento e Encerramento:
    //     Ao finalizar o relato, o atendente agradece pela colaboração.

    //     Instruções para o Atendente (ChatGPT):
    //     O ChatGPT deve seguir o script de atendimento, utilizando as mensagens do cliente como contexto para direcionar a conversa. O objetivo é atender às necessidades do cliente e coletar as informações necessárias para registrar o incidente.

    //     Retorne apenas a sua resposta apenas, retorne em texto corrido sem quebra de linha. Não inclua a mensagem do cliente no retorno e nenhuma outra mensagem.

    //     Assim que ele se identificar ja inicie o pedido das informações

    //     se outro nome for digitado depois do pedido de identificação, nao use o nome digitado, use o primeiro nome digitado

    //     `;

    //   let createContext;
    //   createContext = `${order}\n${formatContext.join('\n')}`;
    //   console.log(createContext);
    //   const responseMessage = await this.ai.generateMessage({
    //     model: 'gpt-3.5-turbo-16k',
    //     temperature: 0.5,
    //     messages: [
    //       {
    //         role: 'user',
    //         content: createContext,
    //       },
    //     ],
    //     stream: false,
    //   });
    //   await this.sendMessageRepository.send({
    //     context_id: generatedContextId,
    //     message: 'responseMessage.choices[0].message.content',
    //     author: 'gpt-3',
    //   });
    return {
      context_id: 'generatedContextId',
      message: 'responseMessage',
      author: 'gpt-3',
    };
  }
}
