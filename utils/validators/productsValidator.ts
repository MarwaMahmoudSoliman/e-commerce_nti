import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../models/categoriesModel";
import subcategoriesModel from "../../models/subcategoriesModel";
import productsModel from "../../models/productsModel";

export const createProductValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50 characters'),
  
  check('description')
    .notEmpty().withMessage('Product description is required')
    .isLength({ min: 2, max: 500 }).withMessage('Description length must be between 2 and 500 characters'),
  
  check('quantity')
    .optional()
    .isNumeric().withMessage('Quantity must be a number')
    .toInt()
    .custom((val: number) => {
      if (val < 0) throw new Error('Invalid quantity');
      return true;
    }),

  check('price')
    .optional()
    .isNumeric().withMessage('Price must be a number')
    .toFloat()
    .custom((val: number) => {
      if (val <= 0) throw new Error('Invalid price');
      return true;
    }),

  check('priceAfterDiscount')
    .optional()
    .isNumeric().withMessage('Price with discount must be a number')
    .toFloat()
    .custom((val: number, { req }) => {
      if (val < 0) throw new Error('Invalid discount price');
      return true;
    }),

  check('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category ID')
    .custom(async (val: string) => {
      const category = await categoriesModel.findById(val);
      if (!category) throw new Error('Category not found');
      return true;
    }),

  check('subcategory')
    .notEmpty().withMessage('Subcategory is required')
    .isMongoId().withMessage('Invalid subcategory ID')
    .custom(async (val: string, { req }) => {
      const subcategory = await subcategoriesModel.findById(val);
      if (!subcategory) throw new Error('Subcategory not found');
      if (subcategory.category._id!.toString() !== req.body.category) {
        throw new Error('Subcategory does not exist in this category');
      }
      return true;
    }),

  validatorMiddleware,
];

export const getProductValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo ID'),
  validatorMiddleware,
];


export const updateProductValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo ID'),

  check('name').optional()
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50 characters'),

  check('description').optional()
    .isLength({ min: 2, max: 500 }).withMessage('Description length must be between 2 and 500 characters'),

  check('quantity')
    .optional()
    .isNumeric().withMessage('Quantity must be a number')
    .toInt()
    .custom((val: number) => {
      if (val < 0) throw new Error('Invalid quantity');
      return true;
    }),

  check('price')
    .optional()
    .isNumeric().withMessage('Price must be a number')
    .toFloat()
    .custom((val: number) => {
      if (val <= 0) throw new Error('Invalid price');
      return true;
    }),

  check('priceAfterDiscount')
    .optional()
    .isNumeric().withMessage('Price with discount must be a number')
    .toFloat()
    .custom(async (val: number, { req }) => {
      const productId = req.params?.id || req.body.id;
      if (!productId) throw new Error('Product ID is missing');

      const product = await productsModel.findById(productId);
      if (!product) throw new Error('Product not found');

      if (!val) {
        const originalPrice = req.body.price || product.price;
        req.body.priceAfterDiscount = originalPrice;
      }

      if (val && val < 0) throw new Error('Invalid discount price');
      return true;
    }),

  check('category')
    .optional()
    .isMongoId().withMessage('Invalid category ID')
    .custom(async (val: string) => {
      const category = await categoriesModel.findById(val);
      if (!category) throw new Error('Category not found');
      return true;
    }),

  check('subcategory')
    .optional()
    .isMongoId().withMessage('Invalid subcategory ID')
    .custom(async (val: string, { req }) => {
      const subcategory = await subcategoriesModel.findById(val);
      if (!subcategory) throw new Error('Subcategory not found');
      if (subcategory.category._id!.toString() !== req.body.category) {
        throw new Error('Subcategory does not exist in this category');
      }
      return true;
    }),

  validatorMiddleware,
];


export const deleteProductValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid Mongo ID'),
  validatorMiddleware,
];
