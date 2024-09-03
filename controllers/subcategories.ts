import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import subcategoriesModel from "../models/subcategoriesModel";
import { Subcategories } from "../interfaces/subcategories";

export const getAllSubcategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const subcategories: Subcategories[] = await subcategoriesModel.find()
  res.status(200).json({ data: subcategories})
});

export const createSubategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const subcategories: Subcategories = await subcategoriesModel.create(req.body);
  res.status(201).json({ data:subcategories  })
});

export const getSubcategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const subcategory: Subcategories | null = await subcategoriesModel.findById(req.params.id);
  res.status(200).json({ data:subcategory })
});

export const updateSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const subcategory: Subcategories | null = await subcategoriesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ data: subcategory})
});
export const deleteSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const subcategory: Subcategories| null = await subcategoriesModel.findByIdAndDelete(req.params.id);
  res.status(204).json()
});