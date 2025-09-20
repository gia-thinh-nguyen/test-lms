import { useState } from 'react';

export const useCreateTeacher = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createTeacher = async (teacherData) => {
    const { firstName, lastName, username, emailAddress, password } = teacherData;

    // Basic validation
    if (!firstName || !lastName || !username || !emailAddress || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsCreating(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/admin/create-teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          emailAddress,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create teacher account');
      }

      const result = await response.json();
      setSuccess(true);
      
      // Optionally reset form or redirect
      return result;
      
    } catch (error) {
      console.error('Error creating teacher:', error);
      setError(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    createTeacher,
    isCreating,
    error,
    success,
    resetState
  };
};