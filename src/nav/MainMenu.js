import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

const MainMenu = () => {
    return (
      <ButtonGroup>
        <Button>
          <Link to="/">
            All Users
          </Link>
        </Button>
        <Button>
        <Link to="/edit-user/">
          Add new user
        </Link>
      </Button>
      </ButtonGroup>
    );
  };

  export default MainMenu;