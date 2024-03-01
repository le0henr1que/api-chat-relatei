export interface MessageModel {
  //TODO: alterar id para ser retorno padrao
  context_id: string | null;
  message: string;
}

export interface UseCaseMessageModel {
  context_id: string | null;
  message: string;
  type: 'sent' | 'received';
}
