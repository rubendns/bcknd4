function validateProduct(req, res, next) {
  const { id, title, description, price, stock, status } = req.body;

  if (!id) {
    return res.json({
      error: "Id is required",
    });
  }

  if (!title) {
    return res.json({
      error: "Title is required",
    });
  }

  if (!description) {
    return res.json({
      error: "Description is required",
    });
  }

  if (!price) {
    return res.json({
      error: "Price is required",
    });
  }

  if (!stock) {
    return res.json({
      error: "Stock is required",
    });
  }

  if (!status) {
    return res.json({
      error: "Status is required",
    });
  }

  next();
}

export { validateProduct };

function validateProductSocket({
  id,
  title,
  description,
  price,
  stock,
  status,
}) {
  if (!id) {
    return res.json({
      error: "Id is required",
    });
  }

  if (!title) {
    return res.json({
      error: "Title is required",
    });
  }

  if (!description) {
    return res.json({
      error: "Description is required",
    });
  }

  if (!price) {
    return res.json({
      error: "Price is required",
    });
  }

  if (!stock) {
    return res.json({
      error: "Stock is required",
    });
  }

  if (!status) {
    return res.json({
      error: "Status is required",
    });
  }
}
