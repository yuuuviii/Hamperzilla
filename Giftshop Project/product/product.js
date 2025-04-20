// Fetch product data from products.json
fetch('/Giftshop Project/products.json')
  .then((response) => response.json())
  .then((products) => {
    // Get the product ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    // Find the product with the matching ID
    const productData = products.find((product) => product.id === productId);

    if (productData) {
      // Populate product details
      document.getElementById("productName").textContent = productData.name;
      document.getElementById("productPrice").textContent = productData.price;
      document.getElementById("productDescription").textContent = productData.description;
      document.getElementById("mainImage").src = productData.image;

      // Populate thumbnails
      const thumbnailContainer = document.getElementById("thumbnailContainer");
      productData.smallimg.forEach((image) => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = "Thumbnail";
        img.addEventListener("click", () => {
          document.getElementById("mainImage").src = image;
        });
        thumbnailContainer.appendChild(img);
      });

      // Add to Cart button functionality
      document.getElementById("addToCartButton").textContent = "Add to Cart";
      document.getElementById("addToCartButton").addEventListener("click", () => {
        alert(`${productData.name} has been added to your cart!`);
      });
    } else {
      console.error("Product not found!");
    }
  })
  .catch((error) => {
    console.error("Error fetching product data:", error);
  });