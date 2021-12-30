import {useSubscription,gql} from '@apollo/client';
import './Home.scss';

const SUB = gql`
subscription Subscription($name: String) {
  postCreated(name: $name)
}`;


export  default function Home() {
  const {data} = useSubscription(SUB,{variables:{
    name:'Gian'
  }})
  console.log(data)
  return (
    <div>
      <h2>
        Estamos en la Home
      </h2>
    </div>
  )
}
