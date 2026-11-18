// Import any needed model functions
import { getAllCategories, getCategoryByID, getAllProjectsForCategory, getAllCategoriesForProject, updateCategoryAssignments } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

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

const showEditCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const allCategories = await getAllCategories();
    const currentCategories = await getAllCategoriesForProject(projectId);

    const title = `Assign Categories to Project: ${projectDetails.title}`
    res.render('assign-categories', { title, projectId, projectDetails, allCategories, currentCategories });
}

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const categoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray)
    req.flash('success', 'Project categories updated successfully');
    res.redirect(`/project/${projectId}`);
};


// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showEditCategoriesForm, processAssignCategoriesForm };
