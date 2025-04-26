import axios from 'axios';

const API_URL = 'http://localhost:8095/api/v1/community';

// Fetch all communities
export const getAllCommunities = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-communitys`);
    return response.data;
  } catch (error) {
    console.error('Error fetching communities:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch communities');
  }
};

// Fetch community by ID
export const getCommunityById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get-by-id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching community with ID ${id}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Community not found');
  }
};

// Create a new community
export const createCommunity = async (communityData) => {
  try {
    const response = await axios.post(`${API_URL}/save`, communityData);
    return response.data;
  } catch (error) {
    console.error('Error creating community:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'Failed to create community'
    );
  }
};

// Update existing community
export const updateCommunity = async (communityData) => {
  try {
    if (!communityData.id) {
      throw new Error('Community ID is required for update');
    }

    const response = await axios.put(
      `${API_URL}/update/${communityData.id}`, 
      communityData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating community with ID ${communityData.id}:`, 
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'Failed to update community'
    );
  }
};

// Delete community
export const deleteCommunity = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete-community/${id}`);
    return id;
  } catch (error) {
    console.error('Error deleting community:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error || 
      'Failed to delete community'
    );
  }
};

// Fetch communities by active state
export const getCommunitiesByActiveState = async (isActive) => {
  try {
    const response = await axios.get(
      `${API_URL}/get-all-communitys-by-active-state/${isActive}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching ${isActive ? 'active' : 'inactive'} communities:`,
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 
      'Failed to fetch communities'
    );
  }
};