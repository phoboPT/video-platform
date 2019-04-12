import { supportedExtensions } from './formatExtensions';

export default function validateExtension(string) {
  const format = string.slice(((string.lastIndexOf('.') - 1) >>> 0) + 2);
  let isValid = false;
  supportedExtensions.some(extension => {
    if (format === extension) {
      isValid = true;
    }
  });
  return isValid;
}
