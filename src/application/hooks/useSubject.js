// useSubjects.js - Fixed version
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchSubjects, 
  createSubject, 
  updateSubject, 
  deleteSubject,
  reset
} from '../stores/subjectSlice';

// Custom hook for subject management
export const useSubjects = () => {
  const dispatch = useDispatch();
  const { 
    subjects, 
    isLoading, 
    isSuccess, 
    isError, 
    message,
    pagination 
  } = useSelector(state => state.subjects);
  
  // State for pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Effect to fetch subjects when pagination changes
  useEffect(() => {
    dispatch(fetchSubjects({ page, size: pageSize }));
    
    // Cleanup function
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, page, pageSize, isSuccess]);

  // Function to create a new subject
  const handleCreateSubject = async (subjectData) => {
    console.log('Creating subject with data:', subjectData);
    // FIXED: Make sure we're using mentorUserNameList consistently
    await dispatch(createSubject({
      name: subjectData.name,
      content: subjectData.content,
      description: subjectData.description || '',
      refs: subjectData.refs,
      mentorUsernameList: subjectData.mentorUsernameList, // Keep the exact field name expected by API
      assignedDate: subjectData.assignedDate || new Date().toISOString()
    }));
    
    // Refresh after successful creation
    dispatch(fetchSubjects({ page, size: pageSize }));
  };

  // Function to update a subject
  const handleUpdateSubject = async (subjectData) => {
    console.log('Updating subject with data:', subjectData);
    // FIXED: Make sure we're using mentorUserNameList consistently
    await dispatch(updateSubject({
      id: subjectData.id,
      content: subjectData.content,
      description: subjectData.description || '',
      refs: subjectData.refs,
      mentorUsernameList: subjectData.mentorUsernameList, // Keep the exact field name expected by API
      assignedDate: subjectData.assignedDate || new Date().toISOString()
    }));
    
    // Refresh after successful update
    dispatch(fetchSubjects({ page, size: pageSize }));
  };

  // Function to delete a subject
  const handleDeleteSubject = async (id) => {
    await dispatch(deleteSubject(id));
    // Refresh the subject list after deletion
    dispatch(fetchSubjects({ page, size: pageSize }));
  };

  // Handle page change
  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage - 1); // Antd uses 1-based indexing, while our API uses 0-based
    setPageSize(newPageSize);
  };

  return {
    subjects,
    pagination: {
      ...pagination,
      current: pagination.number + 1, // Convert to 1-based for Antd
      pageSize: pagination.size,
      total: pagination.totalElement
    },
    isLoading,
    isError,
    message,
    handleCreateSubject,
    handleUpdateSubject,
    handleDeleteSubject,
    handlePageChange
  };
};

export default useSubjects;