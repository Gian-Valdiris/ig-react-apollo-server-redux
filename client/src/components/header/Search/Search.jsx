
import { useState } from 'react';
import {Search} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {useLazyQuery} from '@apollo/client'; 


import {SEARCH} from '../../../graphql/Querys';
import imgAvatar from '../../../assets/avatar.png';
import './Search.scss';
function SearchComponent() {

  const [results,setResult] = useState(null);

  const [SearchUsers,{loading}] = useLazyQuery(SEARCH,{
    onCompleted({search:data}){  
      const newResults = data.map((i,index)=>({
        title:i.name,
        key:index,
        ...i
      }))
      setResult(newResults)
    }
  })  
  const handleChanges=({target})=> SearchUsers({variables:{search:target.value}})
  
  return (
    <Search
      fluid
      input={{icon:'search',iconPosition:'left'}}
      loading={loading}
      onSearchChange={handleChanges}
      results={results}
      resultRenderer={ResultRender}
    >

    </Search>
  )
}

function ResultRender({title,username ,avatar }){

  return (
    <div className='reusults-search'>
      <img src={avatar?avatar:imgAvatar} alt = '' />
      <div className='data'>
        <Link to = {`/${username}`}>
          <h4>{title}<br />{username}</h4>
        </Link>
      </div>
    </div>
  )

}
export default SearchComponent;
