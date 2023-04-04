import './footer.css'

const Footer = () => {
return (
  <footer className="footer-container">
  <div className='name-footer'>
    <div>
      Developed By Jared Hem
    </div>
    <a href='https://www.linkedin.com/in/jared-hem/' target='_blank' rel="noreferrer" className='icons'>
      <i class="fa-brands fa-linkedin fa-xl"></i>
    </a>
    <a href='https://github.com/JvredH' target='_blank' rel="noreferrer" className='icons'>
      <i class="fa-brands fa-square-github fa-xl"></i>
    </a>
  </div>
</footer>
)
}

export default Footer;
