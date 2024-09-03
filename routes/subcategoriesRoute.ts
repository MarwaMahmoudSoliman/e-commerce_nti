import { Router } from 'express';
import { createSubategory, deleteSubCategory, getAllSubcategories, getSubcategory, updateSubCategory} from '../controllers/subcategories';

const subcategoriesRoute: Router = Router()

subcategoriesRoute.route('/')
  .get(getAllSubcategories)
  .post(createSubategory);


  subcategoriesRoute.route('/:id')
  .get(getSubcategory)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

export default  subcategoriesRoute;