import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../entities/Project';

export const createProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const projectRepo = getRepository(Project);

  try {
    const project = projectRepo.create({ name, description, user: req.user });
    await projectRepo.save(project);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  const projectRepo = getRepository(Project);

  try {
    const projects = await projectRepo.find({ where: { user: req.user }, relations: ['tasks'] });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const projectRepo = getRepository(Project);

  try {
    let project = await projectRepo.findOne(id);
    if (!project || project.user !== req.user) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.name = name;
    project.description = description;
    await projectRepo.save(project);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const projectRepo = getRepository(Project);

  try {
    let project = await projectRepo.findOne(id);
    if (!project || project.user !== req.user) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await projectRepo.remove(project);
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
