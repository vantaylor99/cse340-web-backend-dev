import db from './db.js'

const getAllCategories = async () => {
  const query = `
      SELECT category_id, name
      FROM public.categories;
    `;

  const result = await db.query(query);

  return result.rows;
}

const getCategoryByID = async (categoryId) => {
  const query = `
    SELECT category_id, name
    FROM public.categories
    WHERE category_id = $1;
  `

  const queryParams = [categoryId]
  const result = await db.query(query, queryParams);

  // Return the first row of the result set, or null if no rows are found
  return result.rows.length > 0 ? result.rows[0] : null;
}

const getAllCategoriesForProject = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM public.service_project_categories AS spc
    JOIN public.categories AS c
        ON c.category_id = spc.category_id
    WHERE spc.project_id = $1
    ORDER BY c.name;
  `

  const queryParams = [projectId]
  const results = await db.query(query, queryParams);

  return results.rows;
}

const getAllProjectsForCategory = async (categoryId) => {
  const query = `
    SELECT
        sp.project_id,
        sp.title,
        sp.description,
        sp.date,
        sp.location,
        sp.organization_id,
        o.name AS organization_name
    FROM public.service_project_categories AS spc
    JOIN public.service_projects AS sp
        ON sp.project_id = spc.project_id
    LEFT JOIN public.organization AS o
        ON o.organization_id = sp.organization_id
    WHERE spc.category_id = $1
    ORDER BY sp.date, sp.project_id;
  `

  const queryParams = [categoryId]
  const results = await db.query(query, queryParams);

  return results.rows;
}

const assignCategoryToProject = async (projectId, categoryId) => {
  const query = `
    INSERT INTO public.service_project_categories (project_id, category_id)
    VALUES ($1, $2);
  `;

  const queryParams = [projectId, categoryId];
  await db.query(query, queryParams);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  const deleteQuery = `
    DELETE FROM public.service_project_categories
    WHERE project_id = $1;
  `;
  const queryParams = [projectId];
  await db.query(deleteQuery, queryParams);

  for (const categoryId of categoryIds) {
    await assignCategoryToProject(projectId, categoryId);
  }
};

const createNewCategory = async (categoryName) => {
  const query = `
    INSERT INTO public.categories (name)
    VALUES ($1)
    RETURNING category_id;
  `

  const queryParams = [categoryName]
  const result = await db.query(query, queryParams)

  if (result.rows.length === 0) {
    throw new Error("Failed to create category");
  }
  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new cateogry with ID:', result.rows[0].category_id)
  }

  return result.rows[0].category_id;
}

const updateCategory = async (categoryId, name) => {
  const query = `
        UPDATE categories
        SET name = $2
        WHERE category_id = $1
        RETURNING category_id;
        `;

  const queryParams = [categoryId, name];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log(`Updated category with ID: ${categoryId}`);
  }

  return result.rows[0].category_id;
};

export { getAllCategories, getCategoryByID, getAllCategoriesForProject, getAllProjectsForCategory, updateCategoryAssignments, createNewCategory, updateCategory };