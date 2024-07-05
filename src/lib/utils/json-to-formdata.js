function jsonToFormData(json) {
  const formData = new FormData();

  Object.keys(json).forEach((key) => {
    if (Array.isArray(json[key])) {
      json[key].forEach((value, index) => {
        formData.append(`${key}[${index}]`, value);
      });
    } else {
      formData.append(key, json[key]);
    }
  });

  return formData;
}

export { jsonToFormData };
