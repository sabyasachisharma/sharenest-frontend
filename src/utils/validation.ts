// Validation utilities for forms

// Common profanity words (add more as needed)
const PROFANITY_WORDS = [
  'fuck', 'shit', 'damn', 'bitch', 'ass', 'hell', 'crap', 'piss', 'dick', 'cock',
  'bastard', 'slut', 'whore', 'idiot', 'stupid', 'dumb', 'moron', 'retard',
  // Add German profanity words
  'scheiße', 'fick', 'arsch', 'dumm', 'blöd', 'scheisse', 'verdammt', 'mist',
  // Add more languages as needed
];

// Email validation regex (RFC 5322 compliant)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// German phone number validation
// Supports formats: +49151234567, +49 15 123456789, +49-15-123456789, +49 (15) 123456789
const GERMAN_PHONE_REGEX = /^\+49\s?(\(0\)|0)?\s?1[5-7]\s?[\d\s\-\(\)]{8,12}$/;

// Name validation (letters, spaces, hyphens, apostrophes only)
const NAME_REGEX = /^[a-zA-ZäöüÄÖÜß\s'-]+$/;

// Validation error messages
export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email address is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PHONE_REQUIRED: 'Phone number is required',
  PHONE_INVALID: 'Please enter a valid German phone number (e.g., +49 15 123456789)',
  PHONE_FORMAT: 'Phone number must start with +49 and include a mobile prefix (15, 16, or 17)',
  NAME_REQUIRED: 'Name is required',
  NAME_INVALID: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  NAME_NO_NUMBERS: 'Name cannot contain numbers',
  NAME_TOO_SHORT: 'Name must be at least 2 characters long',
  NAME_TOO_LONG: 'Name cannot exceed 50 characters',
  PROFANITY_DETECTED: 'Please use appropriate language',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
  PASSWORD_WEAK: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  REQUIRED_FIELD: 'This field is required',
};

// Check for profanity in text
export const containsProfanity = (text: string): boolean => {
  if (!text) return false;
  
  const cleanText = text.toLowerCase().replace(/[^a-zA-ZäöüÄÖÜß]/g, '');
  
  return PROFANITY_WORDS.some(word => {
    const cleanWord = word.toLowerCase();
    return cleanText.includes(cleanWord);
  });
};

// Email validation
export const validateEmail = (email: string): { isValid: boolean; message?: string } => {
  if (!email) {
    return { isValid: false, message: VALIDATION_MESSAGES.EMAIL_REQUIRED };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { isValid: false, message: VALIDATION_MESSAGES.EMAIL_INVALID };
  }
  
  return { isValid: true };
};

// German phone number validation
export const validateGermanPhone = (phone: string): { isValid: boolean; message?: string } => {
  if (!phone) {
    return { isValid: false, message: VALIDATION_MESSAGES.PHONE_REQUIRED };
  }
  
  // Remove all whitespace and special characters for basic check
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  // Check if it starts with +49
  if (!cleanPhone.startsWith('+49')) {
    return { isValid: false, message: VALIDATION_MESSAGES.PHONE_FORMAT };
  }
  
  // Check if it has the correct mobile prefix (15, 16, 17)
  const numberPart = cleanPhone.substring(3); // Remove +49
  if (!numberPart.match(/^0?1[5-7]/)) {
    return { isValid: false, message: VALIDATION_MESSAGES.PHONE_FORMAT };
  }
  
  // Check total length (should be 12-14 digits including +49)
  if (cleanPhone.length < 12 || cleanPhone.length > 14) {
    return { isValid: false, message: VALIDATION_MESSAGES.PHONE_INVALID };
  }
  
  // Final regex validation
  if (!GERMAN_PHONE_REGEX.test(phone)) {
    return { isValid: false, message: VALIDATION_MESSAGES.PHONE_INVALID };
  }
  
  return { isValid: true };
};

// Name validation
export const validateName = (name: string): { isValid: boolean; message?: string } => {
  if (!name) {
    return { isValid: false, message: VALIDATION_MESSAGES.NAME_REQUIRED };
  }
  
  if (name.length < 2) {
    return { isValid: false, message: VALIDATION_MESSAGES.NAME_TOO_SHORT };
  }
  
  if (name.length > 50) {
    return { isValid: false, message: VALIDATION_MESSAGES.NAME_TOO_LONG };
  }
  
  // Check for numbers
  if (/\d/.test(name)) {
    return { isValid: false, message: VALIDATION_MESSAGES.NAME_NO_NUMBERS };
  }
  
  // Check for invalid characters
  if (!NAME_REGEX.test(name)) {
    return { isValid: false, message: VALIDATION_MESSAGES.NAME_INVALID };
  }
  
  // Check for profanity
  if (containsProfanity(name)) {
    return { isValid: false, message: VALIDATION_MESSAGES.PROFANITY_DETECTED };
  }
  
  return { isValid: true };
};

// Password validation
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (!password) {
    return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_REQUIRED };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_TOO_SHORT };
  }
  
  // Check for at least one uppercase, one lowercase, and one number
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return { isValid: false, message: VALIDATION_MESSAGES.PASSWORD_WEAK };
  }
  
  return { isValid: true };
};

// Bio/description validation
export const validateBio = (bio: string): { isValid: boolean; message?: string } => {
  if (!bio) {
    return { isValid: true }; // Bio is optional
  }
  
  if (bio.length > 500) {
    return { isValid: false, message: 'Bio cannot exceed 500 characters' };
  }
  
  if (containsProfanity(bio)) {
    return { isValid: false, message: VALIDATION_MESSAGES.PROFANITY_DETECTED };
  }
  
  return { isValid: true };
};

// General text validation (for any user input)
export const validateText = (text: string, fieldName: string, options?: {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  allowNumbers?: boolean;
  checkProfanity?: boolean;
}): { isValid: boolean; message?: string } => {
  
  const {
    required = false,
    minLength = 0,
    maxLength = 1000,
    allowNumbers = true,
    checkProfanity = true
  } = options || {};
  
  if (required && !text) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  if (!text) {
    return { isValid: true }; // If not required and empty, it's valid
  }
  
  if (text.length < minLength) {
    return { isValid: false, message: `${fieldName} must be at least ${minLength} characters long` };
  }
  
  if (text.length > maxLength) {
    return { isValid: false, message: `${fieldName} cannot exceed ${maxLength} characters` };
  }
  
  if (!allowNumbers && /\d/.test(text)) {
    return { isValid: false, message: `${fieldName} cannot contain numbers` };
  }
  
  if (checkProfanity && containsProfanity(text)) {
    return { isValid: false, message: VALIDATION_MESSAGES.PROFANITY_DETECTED };
  }
  
  return { isValid: true };
};

// Format German phone number for display
export const formatGermanPhone = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digits except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // If it doesn't start with +49, add it
  if (!cleaned.startsWith('+49')) {
    if (cleaned.startsWith('49')) {
      return `+${cleaned}`;
    }
    if (cleaned.startsWith('0')) {
      return `+49${cleaned.substring(1)}`;
    }
    return `+49${cleaned}`;
  }
  
  return cleaned;
};

// Validate form data
export const validateFormData = (data: Record<string, any>, rules: Record<string, any>): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = `${rule.label || field} is required`;
      return;
    }
    
    if (!value) return; // Skip validation if not required and empty
    
    // Apply specific validation based on field type
    switch (rule.type) {
      case 'email':
        const emailValidation = validateEmail(value);
        if (!emailValidation.isValid) {
          errors[field] = emailValidation.message!;
        }
        break;
        
      case 'phone':
        const phoneValidation = validateGermanPhone(value);
        if (!phoneValidation.isValid) {
          errors[field] = phoneValidation.message!;
        }
        break;
        
      case 'name':
        const nameValidation = validateName(value);
        if (!nameValidation.isValid) {
          errors[field] = nameValidation.message!;
        }
        break;
        
      case 'password':
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isValid) {
          errors[field] = passwordValidation.message!;
        }
        break;
        
      case 'text':
        const textValidation = validateText(value, rule.label || field, rule.options);
        if (!textValidation.isValid) {
          errors[field] = textValidation.message!;
        }
        break;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  validateEmail,
  validateGermanPhone,
  validateName,
  validatePassword,
  validateBio,
  validateText,
  validateFormData,
  formatGermanPhone,
  containsProfanity,
  VALIDATION_MESSAGES
}; 