import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories,uploadCategoryImage, resizeCategoryImage, getCategory, updateCategory } from '../controllers/categories';
import subcategoriesRoute from './subcategoriesRoute';
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validators/categoriesValidator';

const categoriesRoute: Router = Router()
categoriesRoute.use('/:categoryId/subcategories', subcategoriesRoute)
categoriesRoute.route('/')
  .get(getAllCategories)
  .post(uploadCategoryImage, resizeCategoryImage,createCategoryValidator, createCategory);

categoriesRoute.route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

export default categoriesRoute;   