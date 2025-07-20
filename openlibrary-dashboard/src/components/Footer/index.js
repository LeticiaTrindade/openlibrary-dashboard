import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>
        Letícia Trindade &nbsp;|&nbsp; Estudante de Computação na UFRPE
      </p>
      <p>
        <a href="https://github.com/leticiatrindade" target="_blank" rel="noopener noreferrer" style={linkStyle}>Github</a> &nbsp;|&nbsp; <a href="https://www.linkedin.com/in/leticiatrindadett/" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>
      </p>
      <p>© {new Date().getFullYear()} Letícia Trindade. Todos os direitos reservados.</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#282c34',
  color: '#ffffff',
  textAlign: 'center',
  padding: '20px 10px',
  fontSize: '14px',
  width: '100%',
  marginTop: '10px'
};

const linkStyle = {
  color: '#61dafb',
  textDecoration: 'none',
};

export default Footer;
