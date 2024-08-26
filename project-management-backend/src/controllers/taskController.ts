import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Task } from '../entities/Task';
import { Project } from '../entities/Project';

export const createTask = async (req: Request, res: Response) => {
  const { title, description, projectId } = req.body;
  const taskRepo = getRepository(Task);
  const projectRepo = getRepository(Project);

  try {
    const project = await projectRepo.findOne(projectId);
    if (!project || project.user !== req.user) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const task = taskRepo.create({ title, description, project });
    await taskRepo.save(task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const taskRepo = getRepository(Task);

  try {
    const tasks = await taskRepo.find({ where: { project: projectId }, relations: ['project'] });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const taskRepo = getRepository(Task);

  try {
    let task = await taskRepo.findOne(id, { relations: ['project'] });
    if (!task || task.project.user !== req.user) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    await taskRepo.save(task);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const taskRepo = getRepository(Task);

  try {
    let task = await taskRepo.findOne(id, { relations: ['project'] });
    if (!task || task.project.user !== req.user) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await taskRepo.remove(task);
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
