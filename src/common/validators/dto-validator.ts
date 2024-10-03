import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    const dtoObj = plainToInstance(dtoClass, req.body);
    validate(dtoObj).then((errors) => {
      if (errors.length > 0) {
        const dtoErrors = errors
          .map((error) => Object.values(error.constraints || {}))
          .flat();
        res.status(400).json({ errors: dtoErrors });
      } else {
        req.body = dtoObj;
        next();
      }
    });
  };
}
