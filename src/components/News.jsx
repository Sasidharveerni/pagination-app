import React, { useEffect, useState } from 'react'
import NewsImg from '../assets/NewsImg.jpg';
import '../App.css';

function News() {
  const [news, setNews] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=7e8b91d76c3a4b8588d5d34ca1b4f5d2');
        const data = await res.json();
        // console.log(data)
        setNews(data.articles)
      }
      catch (error) {
        alert('There is an error in fetching news !')
        console.log(error)
      }
    }
    fetchNews();
  }, [])


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(news.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const lastIndex = itemsPerPage * currentPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentNews = news.slice(firstIndex, lastIndex);

  return (
    <>
      <div className='news-container'>

        {currentNews.map((article, ind) => (
          <div>
            <h2>{article.author}</h2>
            <h3>{article.title}</h3>
            {article.urlToImage ? (
              <img className='news-img' src={article.urlToImage} alt='' />
            ) :
              (
                <img className='news-img' src={NewsImg} alt='' />
              )

            }
            <p>{article.description}</p>
          </div>
        ))}
      </div>


      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <span
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
          style={{cursor: 'pointer'}}
        >
          ◀
        </span>

        {pageNumbers.map((numbers) => (
          <div
          onClick={() => {paginate(numbers)}}
          style={{cursor: 'pointer', marginLeft: '2rem'}}
          >
            {numbers}
          </div>
        ))}

        <span
        onClick={() => paginate(currentPage < pageNumbers.length ? currentPage + 1 : currentPage)}
        style={{cursor: 'pointer', marginLeft: '2rem'}}
        >
          ▶
        </span>
      </div>


    </>
  )
}

export default News