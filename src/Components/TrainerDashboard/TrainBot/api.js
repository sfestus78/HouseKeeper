// Dummy API service for Bot Training functionality
// This simulates backend API calls with local storage and promises

const API_DELAY = 1000; // Simulate network delay

// Simulate a database using localStorage
const STORAGE_KEYS = {
  BOT_TRAINING_DATA: 'bot_training_data',
  PROPERTIES: 'trainer_properties'
};

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get data from localStorage
const getStorageData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return {};
  }
};

// Helper function to save data to localStorage
const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

// API Functions

/**
 * Save FAQs for a property
 * @param {Object} data - The FAQ data
 * @param {string} data.propertyId - Property ID
 * @param {Array} data.questions - Array of questions
 * @returns {Promise<Object>} API response
 */
export const saveFAQs = async (data) => {
  await delay(API_DELAY);
  
  try {
    const { propertyId, questions } = data;
    
    if (!propertyId || !questions || !Array.isArray(questions)) {
      throw new Error('Invalid data provided');
    }

    // Get existing training data
    const trainingData = getStorageData(STORAGE_KEYS.BOT_TRAINING_DATA);
    
    // Create or update property training data
    if (!trainingData[propertyId]) {
      trainingData[propertyId] = {
        propertyId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        steps: {}
      };
    }

    // Save Step 1 (FAQs) data
    trainingData[propertyId].steps.step1 = {
      questions: questions.map((q, index) => ({
        ...q,
        id: q.id || index + 1,
        createdAt: new Date().toISOString()
      })),
      completedAt: new Date().toISOString(),
      status: 'completed'
    };

    trainingData[propertyId].updatedAt = new Date().toISOString();

    // Save to localStorage
    const saved = setStorageData(STORAGE_KEYS.BOT_TRAINING_DATA, trainingData);
    
    if (!saved) {
      throw new Error('Failed to save data');
    }

    return {
      status: 'success',
      message: 'FAQs saved successfully',
      data: {
        propertyId,
        stepCompleted: 'step1',
        questionsCount: questions.length,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message || 'Failed to save FAQs',
      error: error
    };
  }
};

/**
 * Get training data for a property
 * @param {string} propertyId - Property ID
 * @returns {Promise<Object>} API response with training data
 */
export const getTrainingData = async (propertyId) => {
  await delay(500);
  
  try {
    if (!propertyId) {
      throw new Error('Property ID is required');
    }

    const trainingData = getStorageData(STORAGE_KEYS.BOT_TRAINING_DATA);
    const propertyData = trainingData[propertyId];

    if (!propertyData) {
      return {
        status: 'success',
        message: 'No training data found for this property',
        data: null
      };
    }

    return {
      status: 'success',
      message: 'Training data retrieved successfully',
      data: propertyData
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message || 'Failed to retrieve training data',
      error: error
    };
  }
};

/**
 * Get all training data (for overview/dashboard)
 * @returns {Promise<Object>} API response with all training data
 */
export const getAllTrainingData = async () => {
  await delay(500);
  
  try {
    const trainingData = getStorageData(STORAGE_KEYS.BOT_TRAINING_DATA);
    
    return {
      status: 'success',
      message: 'All training data retrieved successfully',
      data: trainingData
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message || 'Failed to retrieve training data',
      error: error
    };
  }
};

/**
 * Save Step 2 data (Training Content)
 * @param {Object} data - Step 2 training data
 * @returns {Promise<Object>} API response
 */
export const saveStep2Data = async (data) => {
  await delay(API_DELAY);
  
  try {
    const { propertyId, trainingContent } = data;
    
    if (!propertyId || !trainingContent) {
      throw new Error('Invalid data provided');
    }

    const trainingData = getStorageData(STORAGE_KEYS.BOT_TRAINING_DATA);
    
    if (!trainingData[propertyId]) {
      throw new Error('Property training data not found. Please complete Step 1 first.');
    }

    // Save Step 2 data
    trainingData[propertyId].steps.step2 = {
      trainingContent,
      completedAt: new Date().toISOString(),
      status: 'completed'
    };

    trainingData[propertyId].updatedAt = new Date().toISOString();

    const saved = setStorageData(STORAGE_KEYS.BOT_TRAINING_DATA, trainingData);
    
    if (!saved) {
      throw new Error('Failed to save data');
    }

    return {
      status: 'success',
      message: 'Step 2 data saved successfully',
      data: {
        propertyId,
        stepCompleted: 'step2',
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message || 'Failed to save Step 2 data',
      error: error
    };
  }
};

/**
 * Save Step 3 data (Environment Information)
 * @param {Object} data - Step 3 environment questions and answers
 * @returns {Promise<Object>} API response
 */
export const saveStep3Data = async (data) => {
  await delay(API_DELAY);

  try {
    const { propertyId, questions } = data;

    if (!propertyId || !questions || !Array.isArray(questions)) {
      throw new Error('Invalid data provided');
    }

    const trainingData = getStorageData(STORAGE_KEYS.BOT_TRAINING_DATA);

    if (!trainingData[propertyId]) {
      throw new Error('Property training data not found. Please complete previous steps first.');
    }

    // Save Step 3 data
    trainingData[propertyId].steps.step3 = {
      environmentQuestions: questions.map((q, index) => ({
        ...q,
        id: q.id || index + 1,
        updatedAt: new Date().toISOString()
      })),
      completedAt: new Date().toISOString(),
      status: 'completed'
    };

    trainingData[propertyId].updatedAt = new Date().toISOString();

    const saved = setStorageData(STORAGE_KEYS.BOT_TRAINING_DATA, trainingData);

    if (!saved) {
      throw new Error('Failed to save data');
    }

    return {
      status: 'success',
      message: 'Step 3 environment information saved successfully',
      data: {
        propertyId,
        stepCompleted: 'step3',
        questionsCount: questions.length,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message || 'Failed to save Step 3 data',
      error: error
    };
  }
};

/**
 * Complete bot training (final step)
 * @param {Object} data - Final training data
 * @returns {Promise<Object>} API response
 */
export const completeTraining = async (data) => {
  await delay(API_DELAY);
  
  try {
    const { propertyId, finalData } = data;
    
    if (!propertyId) {
      throw new Error('Property ID is required');
    }

    const trainingData = getStorageData(STORAGE_KEYS.BOT_TRAINING_DATA);
    
    if (!trainingData[propertyId]) {
      throw new Error('Property training data not found');
    }

    // Mark training as completed
    trainingData[propertyId].status = 'completed';
    trainingData[propertyId].completedAt = new Date().toISOString();
    trainingData[propertyId].updatedAt = new Date().toISOString();
    
    if (finalData) {
      trainingData[propertyId].finalData = finalData;
    }

    const saved = setStorageData(STORAGE_KEYS.BOT_TRAINING_DATA, trainingData);
    
    if (!saved) {
      throw new Error('Failed to save data');
    }

    return {
      status: 'success',
      message: 'Bot training completed successfully',
      data: {
        propertyId,
        completedAt: trainingData[propertyId].completedAt,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message || 'Failed to complete training',
      error: error
    };
  }
};

/**
 * Delete training data for a property
 * @param {string} propertyId - Property ID
 * @returns {Promise<Object>} API response
 */
export const deleteTrainingData = async (propertyId) => {
  await delay(500);
  
  try {
    if (!propertyId) {
      throw new Error('Property ID is required');
    }

    const trainingData = getStorageData(STORAGE_KEYS.BOT_TRAINING_DATA);
    
    if (!trainingData[propertyId]) {
      return {
        status: 'success',
        message: 'No training data found to delete'
      };
    }

    delete trainingData[propertyId];
    
    const saved = setStorageData(STORAGE_KEYS.BOT_TRAINING_DATA, trainingData);
    
    if (!saved) {
      throw new Error('Failed to delete data');
    }

    return {
      status: 'success',
      message: 'Training data deleted successfully',
      data: {
        propertyId,
        deletedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message || 'Failed to delete training data',
      error: error
    };
  }
};

// Export all functions as default object
export default {
  saveFAQs,
  getTrainingData,
  getAllTrainingData,
  saveStep2Data,
  saveStep3Data,
  completeTraining,
  deleteTrainingData
};
