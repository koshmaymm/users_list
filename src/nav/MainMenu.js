import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

const MainMenu = () => {
    return (
      <ButtonGroup>
        <Button>
          <Link to="/">
            home
          </Link>
        </Button>
        <Button>
          <Link to="/about">
            About
          </Link>
        </Button>
        <Button>
          <Link to="/code">
            code
          </Link>
        </Button>
        <Button>
          <Link to="/contact">
            contact
          </Link>
        </Button>
      </ButtonGroup>
    );
  };

  export default MainMenu;