import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandling";
import subcategoriesModel from "../models/subcategoriesModel";
import { Subcategories } from "../interfaces/subcategories";
import { NextFunction, Request, Response } from "express";
import { FilterData } from "../interfaces/filterData";
import multer from "multer";
import sharp from 'sharp';
import asyncHandler from 'express-async-handler';
import ApiErrors from "../utils/apiErrors";

import { uploadMultiImages } from "../middlewares/uploadImages";
export const filterSubcategories = (req: Request, res: Response, next: NextFunction) => {
  let filterData: FilterData = {};
  if (req.params.categoryId) {
    filterData.category = req.params.categoryId;
  }
  req.filterData = filterData;
  next();
}

export const uploadSubcategoryImages = uploadMultiImages([{ name: 'cover', maxCount: 1 }])
export const resizeSubcategoryImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    const imgName = `Subcategory-${Date.now()}.webp`
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('webp')
      .webp({ quality: 95 })
      .toFile(`uploads/subcategory${imgName}`)
    req.body.cover = imgName;
  }



  next();
})


export const getAllSubcategories = getAll<Subcategories>(subcategoriesModel, 'subcategories');
export const createSubcategory = createOne<Subcategories>(subcategoriesModel);
export const getSubcategory = getOne<Subcategories>(subcategoriesModel);
export const updateSubcategory = updateOne<Subcategories>(subcategoriesModel)
export const deleteSubcategory = deleteOne<Subcategories>(subcategoriesModel)