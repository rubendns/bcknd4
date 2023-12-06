const socket = io();

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const product = {
    id: Number(formData.get("id")),
    title: formData.get("title"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    status: formData.get("status"),
  };

  socket.emit("product_send", product);
  form.reset();
});

socket.on("products", (data) => {
  const products = document.querySelector("#products");

  products.innerHTML = data
    .map((product) => {
      return `
      <p>
        Id: ${product.id} -
        Title: ${product.title} -
        Description: ${product.description} -
        Price: ${product.price} -
        Stock: ${product.stock} -
        Status: ${product.status} -
        <button onclick="eliminarProduct(${product.id})"> Eliminar </button>
      </p>
    `;
    })
    .join(" ");
});

function eliminarProduct(productId) {
  socket.emit("delete_product", productId);
}
