import {useSelector} from 'react-redux';
import {Grid,Image} from 'semantic-ui-react';
import './Publications.scss';
const Publications = () => {
  const {publications} = useSelector(state=>state.publicationsReducer)|| []
  return (
    <>
        {/* <h1>Publicaciones</h1>  */}
    <Grid className='publications'>
        <Grid columns={4}>
          {
            publications.map((i,index)=>(
              <Grid.Column key = {index} >
                <Image src={i.file}  style={{width:300,height:300,objectFit:'cover' }} />
              </Grid.Column>
            ))
          }
        </Grid>
    </Grid>
    </>
  )
}
export default Publications
