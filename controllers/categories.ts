import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import categoriesModel from "../models/categoriesModel";
import { Categories } from "../interfaces/categories";
import multer from "multer";
import sharp from 'sharp';
;
import ApiErrors from "../utils/apiErrors";

import { uploadMultiImages } from "../middlewares/uploadImages";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandling";
export const uploadCategoryImage = uploadMultiImages([{ name: 'cover', maxCount: 1 }]);

export const resizeCategoryImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
  if (req.files && req.files.cover) {
    const imgName = `category-${Date.now()}-cover.webp`;
    
    await sharp(req.files.cover[0].buffer)
      .resize(500, 500)
      .toFormat('webp')
      .webp({ quality: 95 })
      .toFile(`uploads/categories/${imgName}`);
      
    req.body.cover = imgName;
  }
  
  next();
});


export const getAllCategories = getAll<Categories>(categoriesModel, 'categories');
export const createCategory = createOne<Categories>(categoriesModel);
export const getCategory = getOne<Categories>(categoriesModel);
export const updateCategory = updateOne<Categories>(categoriesModel)
export const deleteCategory = deleteOne<Categories>(categoriesModel)