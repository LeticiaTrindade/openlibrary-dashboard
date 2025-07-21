import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const BookCharts = ({ books }) => {
  // Distribuição de livros por década
  const decadeCounts = {};
  books.forEach(book => {
    if (book.first_publish_year) {
      const decade = Math.floor(book.first_publish_year / 10) * 10;
      decadeCounts[decade] = (decadeCounts[decade] || 0) + 1;
    }
  });
  const decadeLabels = Object.keys(decadeCounts).sort();
  const decadeData = decadeLabels.map(d => decadeCounts[d]);

  // Top 10 autores mais encontrados
  const authorCounts = {};
  books.forEach(book => {
    if (book.author_name) {
      book.author_name.forEach(author => {
        authorCounts[author] = (authorCounts[author] || 0) + 1;
      });
    }
  });
  const sortedAuthors = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const authorLabels = sortedAuthors.map(item => item[0]);
  const authorData = sortedAuthors.map(item => item[1]);

  // Gráfico de barras com anos de publicação
  const yearCounts = {};
  books.forEach(book => {
    if (book.first_publish_year) {
      const year = book.first_publish_year;
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });
  const yearLabels = Object.keys(yearCounts).sort((a, b) => a - b);
  const yearData = yearLabels.map(y => yearCounts[y]);

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <div>
        <h4>Distribuição de Livros por Década</h4>
        <Bar
          data={{
            labels: decadeLabels,
            datasets: [{
              label: 'Livros',
              data: decadeData,
              backgroundColor: '#1976d2',
            }],
          }}
          options={{ responsive: true }}
        />
      </div>

      <div>
        <h4>Top 10 Autores Mais Encontrados</h4>
        <Bar
          data={{
            labels: authorLabels,
            datasets: [{
              label: 'Quantidade de Livros',
              data: authorData,
              backgroundColor: '#328be4ff',
            }],
          }}
          options={{ responsive: true, indexAxis: 'y' }}
        />
      </div>

      <div>
        <h4>Publicações por Ano</h4>
        <Bar
          data={{
            labels: yearLabels,
            datasets: [{
              label: 'Livros',
              data: yearData,
              backgroundColor: '#4f9ff0ff',
            }],
          }}
          options={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default BookCharts;
