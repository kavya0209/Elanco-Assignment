import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import elancoLogo from '../../assets/images/elanco1.png'

function CollapsibleExample() {
  
  return (
    <Navbar className="navbar-custom" collapseOnSelect>
      <Navbar.Brand className="navbar-cls" href="/QnA-platform/qna">
        <img
          src={elancoLogo}
          className="d-inline-block align-top logo-cls"
          alt='Affine'
          style={{height : "53px"}}
        />
      </Navbar.Brand>
      <Nav
       className='text-align'
      >
        <Link className='nav-customcls top-right-icon tool-name-css' to="/login" title="Logout"> 
              Data visualization
        </Link>
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <NavLink className='nav-customcls' to="/application"  activeClassName="active">
            <em className="fa-solid fa-database me-2" title="Application Data"></em>
              Application Data
          </NavLink>
          <NavLink className='nav-customcls' to="/resources"  activeClassName="active">
            <em className="fa-solid fa-database me-2" title="Ask Question to AI"></em>
              Resource Data  
          </NavLink>
        </Nav>
        <Nav>
          <Link className='nav-customcls top-right-icon' to="/login" title="Logout">
          <i className="fa-solid fa-arrow-right-from-bracket fa-top-right-icon"></i>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CollapsibleExample;