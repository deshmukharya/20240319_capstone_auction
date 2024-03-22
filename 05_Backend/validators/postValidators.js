// Validation function for name
const validateName = (name) => {
    if (!name || name.trim().length === 0) {
        throw new Error("Name is required.");
    }
};

// Validation function for category
const validateCategory = (category) => {
    if (!category || category.trim().length === 0) {
        throw new Error("Category is required.");
    }
};

// Validation function for image
const validateImage = (image) => {
    if (!image || image.trim().length === 0) {
        throw new Error("Image is required.");
    }
};

module.exports = {
    validateName,
    validateCategory,
    validateImage,
  };