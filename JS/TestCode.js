document.addEventListener('DOMContentLoaded', (event) => {
  const productLists = document.querySelectorAll('.product-list');

  productLists.forEach(productList => {
      let isDown = false;
      let startX;
      let scrollLeft;

      productList.addEventListener('mousedown', (e) => {
          isDown = true;
          productList.classList.add('active');
          startX = e.pageX - productList.offsetLeft;
          scrollLeft = productList.scrollLeft;
      });

      productList.addEventListener('mouseleave', () => {
          isDown = false;
          productList.classList.remove('active');
      });

      productList.addEventListener('mouseup', () => {
          isDown = false;
          productList.classList.remove('active');
      });

      productList.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - productList.offsetLeft;
          const walk = (x - startX) * 3; // Tăng tốc độ kéo
          productList.scrollLeft = scrollLeft - walk;
      });
  });
});
