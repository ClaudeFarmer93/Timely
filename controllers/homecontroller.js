exports.sendReqParam = (req, res) => {
  let todos = req.params.alltodos;
  res.send(`This is the page for ${todos}`);
};
