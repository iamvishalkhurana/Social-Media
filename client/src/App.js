import React,{useEffect,createContext,useReducer,useContext} from 'react'
import './App.css';
import NavBar from './components/Navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/userProfile';
import SubscribeUserPosts from './components/screens/SubscribeUser';
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/NewPassword'
export const UserContext = createContext();

const Routing = () =>{
      const history = useHistory();
      const {state,dispatch}=useContext(UserContext);
      useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
              dispatch({type:"USER",payload:user})
        }
        else {
              if(!history.location.pathname.startsWith('/reset'))
                  history.push('/signin');
            // else history.push('/');
        }
      },[])
      return (
      <Switch>      
      <Route path="/signin">
            <Signin />
      </Route>
      <Route exact path="/profile">
            <Profile />
      </Route>
      <Route path="/signup">
            <Signup />
      </Route>
      <Route path="/create">
            <CreatePost />
      </Route>
      <Route exact path="/">
            <Home />
      </Route>
      <Route path="/profile/:userid">
            <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
            <SubscribeUserPosts />
      </Route>
      <Route exact path="/reset">
            <Reset />
      </Route>
      <Route path="/reset/:token">
            <NewPassword />
      </Route>
      </Switch>
      )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
       <UserContext.Provider value = {{state,dispatch}}>
       <BrowserRouter>
           < NavBar/>
              <Routing />
       </BrowserRouter>
      </UserContext.Provider> 
  )
}

export default App;

