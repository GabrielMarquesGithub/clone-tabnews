const status = (request, response) => {
  response.status(200).json({
    status: "ok2",
  });
};

export default status;
