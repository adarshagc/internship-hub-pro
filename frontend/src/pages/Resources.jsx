import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Resources = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Learning Resources</h1>
      
      {courses.length === 0 ? (
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center text-slate-400">
          No courses available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer">
              <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-slate-400 line-clamp-3">{course.description}</p>
              <button className="mt-4 text-blue-400 text-sm font-medium hover:text-blue-300">View Modules &rarr;</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
