export const handleCastError = (error) => {
  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectID. Please provide a valid id",
  };
};
