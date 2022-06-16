import { HttpException, HttpStatus } from "@nestjs/common";
import { plainToInstance, ClassConstructor } from "class-transformer";
import { ValidationError, validate } from "class-validator";

export class RequestValidationBase {
    public async validateClass<T>(cls: ClassConstructor<any>, value: T) {
        const object = plainToInstance(cls, value);

        const errors = await validate(object);

        this.checkConstraintsErros(this.constraintErrorFormat(errors));
    }

    private constraintErrorFormat(errors: ValidationError[]) {
        return errors.map((error) => {
            for (const key in error.constraints) {
                return error.constraints[key];
            }
        });
    }

    private checkConstraintsErros(errors: string[]) {
        if (errors.length > 0) {
            throw new HttpException(
                {
                    message: errors,
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    public checkEmptyBody(value: any) {
        if (Object.keys(value).length < 1) {
            throw new HttpException(
                "Validation failed: No payload provided.",
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
