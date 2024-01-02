const validateTitulo = (request, response, next) => {
  const { body } = request;

  if (body.titulo === undefined) {
    return response
      .status(400)
      .json({ message: "O campo título é obrigatório." });
  }

  if (body.titulo === "") {
    return response
      .status(400)
      .json({ message: "O campo título não pode ser vazio." });
  }

  next();
};

const validateStatus = (request, response, next) => {
  const { body } = request;

  if (body.status === undefined) {
    return response
      .status(400)
      .json({ message: "O campo status é obrigatório." });
  }

  if (body.status === "") {
    return response
      .status(400)
      .json({ message: "O campo status não pode ser vazio." });
  }

  next();
};

module.exports = {
  validateTitulo,
  validateStatus,
};
