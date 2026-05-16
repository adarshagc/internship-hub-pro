import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', githubUrl: '', deploymentUrl: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', newProject);
      setNewProject({ title: '', description: '', githubUrl: '', deploymentUrl: '' });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">My Projects</h1>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Project Title</label>
            <input type="text" required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Description</label>
            <textarea required rows="2" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">GitHub URL</label>
              <input type="url" value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Deployment URL</label>
              <input type="url" value={newProject.deploymentUrl} onChange={e => setNewProject({...newProject, deploymentUrl: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white" />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Save Project
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            <span className="inline-block mt-2 px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">{project.status}</span>
            <p className="text-slate-400 mt-3">{project.description}</p>
            <div className="mt-4 flex gap-3 text-sm">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white underline">GitHub</a>}
              {project.deploymentUrl && <a href={project.deploymentUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 underline">Live Demo</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
