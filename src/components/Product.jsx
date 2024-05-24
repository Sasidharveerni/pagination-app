import React, { useEffect, useState } from 'react';

function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then(res => {
        setProducts(res.products);
      })
      .catch(err => console.log(err));
  }, []);

  // Calculate items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  // Get page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {products && (
        <>
        <div style={{ margin: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
          {currentItems.map((product, ind) => (
            <div key={ind} style={{ marginRight: '2rem' }}>
              <h1>{product.title}</h1>
              <img src={product.thumbnail} alt='' style={{ width: '10rem' }} />
              <p>{product.description}</p>
            </div>
          ))}
          </div>

          <div className='pagination' style={{ textAlign: 'center' }}>
            <span
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              style={{ cursor: 'pointer', marginRight: '1rem' }}
            >
              ◀
            </span>

            {pageNumbers.map(number => (
              <span
                key={number}
                onClick={() => paginate(number)}
                style={{
                  marginRight: '1rem',
                  cursor: 'pointer',
                  backgroundColor: currentPage === number ? '#d3d3d3' : '#f7f7f6',
                  padding: '0.5rem',
                }}
              >
                {number}
              </span>
            ))}

            <span
              onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
              style={{ cursor: 'pointer', marginLeft: '1rem' }}
            >
              ▶
            </span>
          </div>
          </>
      )}
    </>
  );
}

export default Product;
