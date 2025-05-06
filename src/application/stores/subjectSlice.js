import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subjectService from '../../domain/services/subjectService';

// Initial state
const initialState = {
  subjects: [],
  subject: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  pagination: {
    totalElement: 0,
    totalPage: 0,
    size: 10,
    number: 0
  }
};

// Async thunks
export const fetchSubjects = createAsyncThunk(
  'subjects/fetchAll',
  async (params, thunkAPI) => {
    try {
      return await subjectService.getSubjects(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch subjects';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createSubject = createAsyncThunk(
  'subjects/create',
  async (subject, thunkAPI) => {
    try {
      return await subjectService.createSubject(subject);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to create subject';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSubject = createAsyncThunk(
  'subjects/update',
  async (subject, thunkAPI) => {
    try {
      return await subjectService.updateSubject(subject);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to update subject';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSubject = createAsyncThunk(
  'subjects/delete',
  async (id, thunkAPI) => {
    try {
      await subjectService.deleteSubject(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to delete subject';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice
const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearSubject: (state) => {
      state.subject = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subjects = action.payload.content;
        state.pagination = {
          totalElement: action.payload.totalElement,
          totalPage: action.payload.totalPage,
          size: action.payload.size,
          number: action.payload.number
        };
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create subject
      .addCase(createSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subjects.push(action.payload);
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update subject
      .addCase(updateSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subjects = state.subjects.map(subject => 
          subject.id === action.payload.id ? action.payload : subject
        );
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete subject
      .addCase(deleteSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subjects = state.subjects.filter(subject => subject.id !== action.payload);
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, clearSubject } = subjectSlice.actions;
export default subjectSlice.reducer;