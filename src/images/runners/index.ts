// This file exports all runner images for the GRIT section

// Import runner images
import carlos from './carlos.jpg';
import ana from './ana.jpg';
import miguel from './miguel.jpg';
import carmen from './carmen.jpg';
import javier from './javier.jpg';
import maria from './maria.jpg';

export const runnerImages = {
  carlos,
  ana,
  miguel,
  carmen,
  javier,
  maria
};

export type RunnerName = keyof typeof runnerImages;
