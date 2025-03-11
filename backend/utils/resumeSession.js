// Utility for managing resume session data
import crypto from 'crypto';

// In-memory storage for resume sessions
// In a production environment, this should be replaced with Redis or another session store
const resumeSessions = new Map();

// Session expiration time (30 minutes)
const SESSION_EXPIRY = 30 * 60 * 1000;

/**
 * Create a new resume session
 * @param {Object} resumeData - The resume data to store
 * @returns {String} - The session ID
 */
export const createResumeSession = (resumeData) => {
  // Generate a unique session ID
  const sessionId = crypto.randomUUID();
  
  // Store the resume data with expiration timestamp
  resumeSessions.set(sessionId, {
    data: resumeData,
    expires: Date.now() + SESSION_EXPIRY
  });
  
  // Return the session ID
  return sessionId;
};

/**
 * Get resume data from a session
 * @param {String} sessionId - The session ID
 * @returns {Object|null} - The resume data or null if session not found/expired
 */
export const getResumeSession = (sessionId) => {
  // Check if session exists
  if (!resumeSessions.has(sessionId)) {
    return null;
  }
  
  const session = resumeSessions.get(sessionId);
  
  // Check if session has expired
  if (session.expires < Date.now()) {
    // Clean up expired session
    resumeSessions.delete(sessionId);
    return null;
  }
  
  // Refresh expiration time
  session.expires = Date.now() + SESSION_EXPIRY;
  resumeSessions.set(sessionId, session);
  
  // Return the resume data
  return session.data;
};

/**
 * Update resume data in a session
 * @param {String} sessionId - The session ID
 * @param {Object} resumeData - The updated resume data
 * @returns {Boolean} - True if session was updated, false if session not found
 */
export const updateResumeSession = (sessionId, resumeData) => {
  // Check if session exists
  if (!resumeSessions.has(sessionId)) {
    return false;
  }
  
  const session = resumeSessions.get(sessionId);
  
  // Check if session has expired
  if (session.expires < Date.now()) {
    // Clean up expired session
    resumeSessions.delete(sessionId);
    return false;
  }
  
  // Update session data and refresh expiration
  resumeSessions.set(sessionId, {
    data: resumeData,
    expires: Date.now() + SESSION_EXPIRY
  });
  
  return true;
};

/**
 * Delete a resume session
 * @param {String} sessionId - The session ID
 * @returns {Boolean} - True if session was deleted, false if session not found
 */
export const deleteResumeSession = (sessionId) => {
  return resumeSessions.delete(sessionId);
};

/**
 * Clean up expired sessions
 * This should be called periodically to prevent memory leaks
 */
export const cleanupExpiredSessions = () => {
  const now = Date.now();
  for (const [sessionId, session] of resumeSessions.entries()) {
    if (session.expires < now) {
      resumeSessions.delete(sessionId);
    }
  }
};

// Set up periodic cleanup every 15 minutes
setInterval(cleanupExpiredSessions, 15 * 60 * 1000);