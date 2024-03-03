import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { LogControllerDecorator } from '../../../src/main/decorators/log';
import { serverError } from '@/presentation/helpers/http-helper';
import { LogErrorRepository } from '@/data/protocols/log-error-repository';

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 500,
        body: {
          message: 'any_message',
        },
      };
      return new Promise((resolve) => {
        resolve(httpResponse);
      });
    }
  }
  return new ControllerStub();
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);
  return {
    sut,
    controllerStub,
  };
};

describe('Log Decorator', () => {
  test('should call console.log with correct value', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');

    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
  test('should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        message: 'any_message',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: {
        message: 'any_message',
      },
    });
  });
});
