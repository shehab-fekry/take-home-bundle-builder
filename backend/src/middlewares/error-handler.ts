import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // simple logger
  console.log(`error: ${req.method} ${req.url} - ${error.message}`);

  res.status(500).json({
    message: 'Somthing went wrong, please try again later!',
  });
};
