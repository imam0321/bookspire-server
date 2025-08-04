export const handlerDuplicateError = (error) => {
  const matchedArray = error.message.match(/"([^"]*)"/);

  return {
    statusCode: 400,
    message: `${matchedArray[1]} already exists!!`,
  };
};
