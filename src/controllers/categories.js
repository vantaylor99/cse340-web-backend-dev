// Import any needed model functions
import { getAllCategories, getCategoryByID, getAllProjectsForCategory, getAllCategoriesForProject, updateCategoryAssignments, createNewCategory, updateCategory } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category is required')
        .isLength({ min: 3, max: 100 }).withMessage('Category must be between 3 and 100 characters'),
];

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

const showNewCategoryForm = async (req, res) => {
    const title = 'New Category Form'

    res.render('new-category', {
        title
    });

}

const processNewCategoryForm = async (req, res) => {
    const { name } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect('/new-category');
    }

    try {
        await createNewCategory(name);
        req.flash('success', `Successfully created category: ${name}`);
        res.redirect('/categories');
    } catch (error) {
        console.error('Error creating new category:', error)
        req.flash('error', `There was an error creating category: ${name}`);
        res.redirect('/new-category');
    }
}

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryByID(categoryId);

    if (!category) {
        req.flash('error', 'Category not found');
        return res.redirect('/categories');
    }


    const title = `Edit Category: ${category.name}`
    res.render('edit-category', { title, category });
}

const processEditCategoryForm = async (req, res) => {

    const categoryId = req.params.id
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;
    await updateCategory(categoryId, name);
    req.flash('success', `Category "${name}" Updated`);
    res.redirect(`/category/${categoryId}`);
};

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showEditCategoriesForm, processAssignCategoriesForm, processNewCategoryForm, showNewCategoryForm, categoryValidation, showEditCategoryForm, processEditCategoryForm };
