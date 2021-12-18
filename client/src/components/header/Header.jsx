import './Header.scss';

import {Link} from 'react-router-dom';
import {Container,Grid,Image} from 'semantic-ui-react';

import RigthHeader from './RigthHeader';
import SearchComponent from './Search';
import Logo from '../../assets/instaclone.png'

const  {Column} = Grid; 
function Header () {
  return (
    <div className='header' >
      <Container>
        <Grid>

          <Column width={3}  className="header-logo pointer">
            <Link to = '/'>
              <Image src = {Logo} />
            </Link>
          </Column>
          
          <Column width={10}>
            <SearchComponent />
          </Column>

          <Column width={3}>
            <RigthHeader />
          </Column>
        
        </Grid>
      </Container>
    </div>
  )
}
export default Header
