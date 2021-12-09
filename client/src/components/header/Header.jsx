import './Header.scss';
import React from 'react'
import Logo from '../../assets/instaclone.png'
import {Container,Grid,Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import RigthHeader from './RigthHeader';
function Header () {
  return (
    <div className='header' >
        <Container>

          <Grid>
            
            <Grid.Column width={3}  className="header-logo pointer">
              <Link to = '/'>
                <Image src = {Logo} />
              </Link>
            </Grid.Column>
            
            <Grid.Column width={10}>
              Buscador
            </Grid.Column>

            <Grid.Column width={3}>
                <RigthHeader />
            </Grid.Column>
            
          </Grid>

        </Container>
    </div>
  )
}
export default Header
