import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
    return (
      <div>
        <Link to="/">
          <button>home</button>
        </Link>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/code">
          <button>code</button>
        </Link>
        <Link to="/contact">
          <button>contact</button>
        </Link>
      </div>
    );
  };

  export default MainMenu;