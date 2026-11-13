// Import any needed model functions
import { getAllCategories, getCategoryByID, getAllProjectsForCategory } from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.categoryId;
    const categoriesForId = await getCategoryByID(categoryId);
    const allProjectsForCategory = await getAllProjectsForCategory(categoryId);
    const title = 'Category Details';

    res.render('category', {
        title,
        category: categoriesForId,
        projects: allProjectsForCategory
    });
};


// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };