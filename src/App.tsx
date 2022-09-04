import {useState, useEffect} from 'react'
import './App.css'
import {ApolloClient,  InMemoryCache, gql} from '@apollo/client/core';

import './App.css'

// GraphQLクライアントを生成
const gitClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers:{authorization: `Bearer ${import.meta.env['VITE_REACT_APP_GITHUB_ORGANIZATION_ACCESS_TOKEN']}`},
})

console.log(import.meta.env['REACT_APP_GITHUB_ORGANIZATION_ACCESS_TOKEN'])


function App() {


  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [members, setMembers] = useState([])
  useEffect(()=>{
    gitClient
      .query({
        query:gql`
          query {
            organization(login: "hello-deaf-world") {
              name
              description
              url
              repositories(first:2) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            
              membersWithRole(first:4) {
                nodes {
                  id
                  name
                  avatarUrl
                }
              }
            }
          }
        `,
      })
      .then((response) => {
        const data = response.data.organization
        console.log(data)
        setName(data.name)
        setDescription(data.description)
        setMembers(data.membersWithRole.nodes)
      })
  },[])

  return (
    <div className="App">
      <h1>Apollo Client Test</h1>
      <h1>Do check to console on your browser</h1>
      <br />
      <h3>取得結果</h3>
      <p>{name}</p>
      <p>{description}</p>
      {members.map((member:any)=>{
        return (
          <div style={{display:'flex'}}>
            <img 
              src={member.avatarUrl}
              alt={`the image of ` + member.src}
              width="50"
              height="50"
              style={{borderRadius:'50%'}}/>
            <p style={{paddingLeft:'20px'}}>{member.name}</p>      
          </div>
        )
      })}
    </div>
  )
}

export default App
