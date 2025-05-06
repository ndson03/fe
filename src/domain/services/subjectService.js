// subjectService.js - Fixed version
import subjectApi from '../../infrastructure/api/subjectApi';

// Get all subjects with pagination
const getSubjects = async (params = { page: 0, size: 10 }) => {
  const response = await subjectApi.getAllSubjects(params);
  return response.data; 
};

// Get subject by ID
const getSubjectById = async (id) => {
  const response = await subjectApi.getSubjectById(id);
  return response.data;
};

// Create new subject
const createSubject = async (subjectData) => {
  // FIXED: Map UI model to API model
  const apiModel = {
    name: subjectData.name,
    content: subjectData.content,
    description: subjectData.description || '',
    refs: subjectData.refs,
    // Important: Keep mentorUsernameList field name consistent!
    mentorUsernameList: subjectData.mentorUsernameList || [],
    assignedDate: subjectData.assignedDate || new Date().toISOString()
  };
  
  const response = await subjectApi.createSubject(apiModel);
  return mapToUiModel(response.data);
};

// Update subject
const updateSubject = async (subjectData) => {
  // FIXED: Map UI model to API model
  const apiModel = {
    content: subjectData.content,
    description: subjectData.description || '',
    refs: subjectData.refs,
    // Important: Keep mentorUsernameList field name consistent!
    mentorUsernameList: subjectData.mentorUsernameList || [],
    assignedDate: subjectData.assignedDate || new Date().toISOString()
  };
  
  const response = await subjectApi.updateSubject(subjectData.id, apiModel);
  return mapToUiModel(response.data);
};

// Delete subject
const deleteSubject = async (id) => {
  const response = await subjectApi.deleteSubject(id);
  return response;
};

// Helper function to map API model to UI model
const mapToUiModel = (apiModel) => {
  return {
    id: apiModel.id,
    subjectId: apiModel.id,  // Duplicate for compatibility with UI
    name: apiModel.name,
    description: apiModel.description,
    content: apiModel.content,
    refs: apiModel.refs,  // Store as refs here
    references: apiModel.refs, // And as references for UI compatibility
    // Map mentors properly
    mentors: apiModel.mentors?.map(m => {
      // If mentor has a user property, return that
      if (m.user) return m.user;
      // Otherwise return the mentor object itself
      return m;
    }) || []
  };
};

const subjectService = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};

export default subjectService;