// subjectApi.js - Fixed version
import axiosInstance from './axiosClient';

// Subject API endpoints
const SUBJECT_API = '/subjects';

// Get all subjects with pagination
const getAllSubjects = async (params = { page: 0, size: 10 }) => {
  try {
    const response = await axiosInstance.get(SUBJECT_API, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get subject by ID
const getSubjectById = async (id) => {
  try {
    const response = await axiosInstance.get(`${SUBJECT_API}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new subject
const createSubject = async (subjectData) => {
  try {
    // FIXED: Ensure the data is formatted correctly with mentorUserNameList
    // Do not transform the field name - use exactly what's expected by the API
    const dataToSend = {
      name: subjectData.name,
      content: subjectData.content,
      description: subjectData.description || '',
      refs: subjectData.refs || '',
      mentorUsernameList: subjectData.mentorUsernameList || [], // Use exact field name
      assignedDate: subjectData.assignedDate || new Date().toISOString()
    };
    
    console.log('API createSubject - Sending data:', JSON.stringify(dataToSend, null, 2));
    
    const response = await axiosInstance.post(SUBJECT_API, dataToSend);
    console.log('API createSubject - Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating subject:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};

// Update subject
const updateSubject = async (id, subjectData) => {
  try {
    // FIXED: Ensure the data is formatted correctly with mentorUserNameList
    // Do not transform the field name - use exactly what's expected by the API
    const dataToSend = {
      content: subjectData.content,
      description: subjectData.description || '',
      refs: subjectData.refs || '',
      mentorUsernameList: subjectData.mentorUsernameList || [], // Use exact field name
      assignedDate: subjectData.assignedDate || new Date().toISOString()
    };
    
    console.log(`API updateSubject - Updating subject ${id} with data:`, JSON.stringify(dataToSend, null, 2));
    
    const response = await axiosInstance.put(`${SUBJECT_API}/${id}`, dataToSend);
    console.log(`API updateSubject - Response for ${id}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error updating subject ${id}:`, error);
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};

// Delete subject
const deleteSubject = async (id) => {
  try {
    const response = await axiosInstance.delete(`${SUBJECT_API}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const subjectApi = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};

export default subjectApi;