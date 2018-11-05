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
      </ButtonGroup>
    );
  };

  export default MainMenu;