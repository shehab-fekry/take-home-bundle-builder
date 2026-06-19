import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(
  process.cwd(),
  'src',
  'data',
  'index.json'
);

export const getDataApi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(file);

    res.json({ data });
  } catch (error) {
    next(error);
  }
};
