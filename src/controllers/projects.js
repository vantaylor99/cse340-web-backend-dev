import { getProjectDetails, getUpcomingProjects } from "../models/projects.js";
import { getAllCategoriesForProject } from "../models/categories.js";
const NUMBER_OF_UPCOMING_PROJECTS = 5

const showProjectsPage = async (req, res) => {

    const upcomingProjects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects: upcomingProjects })
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const projectCategories = await getAllCategoriesForProject(projectId)
    const title = 'Project Details'

    res.render('project', {
        title,
        project: projectDetails,
        categories: projectCategories
    })
}

export { showProjectsPage, showProjectDetailsPage }