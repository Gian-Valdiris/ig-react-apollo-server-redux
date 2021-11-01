import {useParams} from 'react-router-dom';

export default function User() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h3>User....</h3>
    </div>
  )
}