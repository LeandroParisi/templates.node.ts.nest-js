export interface IFormatExceptionMessage {
    message: string;
    code: string;
}

export interface IException {
    badRequestException(data: IFormatExceptionMessage): void;
    internalServerErrorException(data?: IFormatExceptionMessage): void;
    forbiddenException(data?: IFormatExceptionMessage): void;
    unauthorizedException(data?: IFormatExceptionMessage): void;
    unProcessableEntity(data: IFormatExceptionMessage): void;
}
