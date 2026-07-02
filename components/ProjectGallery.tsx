'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import type { Project } from '@/lib/types';

interface ProjectGalleryProps {
  projects: Project[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => setActiveProject(project)} />
        ))}
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
