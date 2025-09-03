import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/exercises - Get user's exercises
router.get('/', authenticate, async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'asc' },
    });
    
    res.json({ exercises });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

// POST /api/exercises - Create new exercise
router.post('/', authenticate, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Exercise name is required' });
    }

    // Check if exercise already exists for this user
    const existing = await prisma.exercise.findFirst({
      where: { 
        userId: req.user!.id,
        name: name.trim() 
      }
    });

    if (existing) {
      return res.status(409).json({ error: 'Exercise already exists' });
    }

    const exercise = await prisma.exercise.create({
      data: {
        name: name.trim(),
        userId: req.user!.id,
      },
    });

    res.status(201).json({ exercise });
  } catch (error) {
    console.error('Error creating exercise:', error);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
});

// DELETE /api/exercises/:id - Delete exercise
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await prisma.exercise.findFirst({
      where: { 
        id,
        userId: req.user!.id 
      }
    });

    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    await prisma.exercise.delete({
      where: { id },
    });

    res.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    res.status(500).json({ error: 'Failed to delete exercise' });
  }
});

export { router as exerciseRoutes };