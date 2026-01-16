import { toast } from 'sonner';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: unknown): void => {
  console.error('API Error:', error);

  if (error instanceof Error) {
    // Handle different HTTP status codes
    if ('status' in error) {
      const status = (error as any).status;
      
      switch (status) {
        case 400:
          toast.error('Validation Error', {
            description: error.message || 'Please check your input and try again.',
          });
          break;
        case 401:
          toast.error('Authentication Error', {
            description: 'Please log in to continue.',
          });
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
          break;
        case 403:
          toast.error('Access Denied', {
            description: 'You don\'t have permission to perform this action.',
          });
          break;
        case 404:
          toast.error('Not Found', {
            description: 'The requested resource was not found.',
          });
          break;
        case 429:
          toast.error('Too Many Requests', {
            description: 'Please wait a moment before trying again.',
          });
          break;
        case 500:
          toast.error('Server Error', {
            description: 'Something went wrong. Please try again later.',
          });
          break;
        case 503:
          toast.error('Service Unavailable', {
            description: 'The service is temporarily unavailable. Please try again later.',
          });
          break;
        default:
          toast.error('Error', {
            description: error.message || 'An unexpected error occurred.',
          });
      }
    } else {
      // Generic error without status code
      toast.error('Error', {
        description: error.message || 'An unexpected error occurred.',
      });
    }
  } else if (typeof error === 'string') {
    toast.error('Error', {
      description: error,
    });
  } else {
    toast.error('Error', {
      description: 'An unexpected error occurred.',
    });
  }
};

export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description,
  });
};

export const showInfoToast = (message: string, description?: string) => {
  toast.info(message, {
    description,
  });
};

export const showWarningToast = (message: string, description?: string) => {
  toast.warning(message, {
    description,
  });
};
