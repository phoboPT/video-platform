import {
  fileExtensions,
  videoExtensions,
  imageExtensions,
} from './formatExtensions';

function validateExtension(string, extensionToCompare) {
  const format = string.slice(((string.lastIndexOf('.') - 1) >>> 0) + 2);
  let isValid = false;

  switch (extensionToCompare) {
    case 'image': {
      imageExtensions.some(extension => {
        if (format === extension) {
          isValid = true;
        }
      });
      break;
    }
    case 'video': {
      videoExtensions.some(extension => {
        if (format === extension) {
          isValid = true;
        }
      });
      break;
    }
    case 'file': {
      fileExtensions.some(extension => {
        if (format === extension) {
          isValid = true;
        }
      });
      break;
    }

    default:
      break;
  }

  return isValid;
}
export default validateExtension;
