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

export { getAllCategories, getCategoryByID, getAllCategoriesForProject, getAllProjectsForCategory }  