import './App.css';
import React, { Component } from 'react'
import NavBar from './Component/NavBar';
import News from './Component/News';
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state= {
    progress:10
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
        <Route exact path="/"element= {<News setProgress={this.setProgress}  key="genreal" pageSize={6} country={this.props.country} category="general"/>}/>
        <Route exact path="/business"element= {<News setProgress={this.setProgress}  key="business" pageSize={6} country={this.props.country} category="business"/>}/>
        <Route exact path="/entertainment"element= {<News setProgress={this.setProgress}  key="entertainment" pageSize={6}country='in'category="entertainment"/>}/>
        <Route exact path="/health"element= {<News setProgress={this.setProgress}  key="health" pageSize={6} country={this.props.country} category="health"/>}/>
        <Route exact path="/science"element= {<News setProgress={this.setProgress}  key="science" pageSize={6} country={this.props.country} category="science"/>}/>
        <Route exact path="/sports"element= {<News setProgress={this.setProgress}  key="sports" pageSize={6} country={this.props.country} category="sports"/>}/>
        <Route exact path="/technology"element= {<News setProgress={this.setProgress}  key="technology" pageSize={6} country={this.props.country} category="technology"/>}/>

        </Routes>

        {/* <Routes>
        <Route exact path="/in"element= {<News setProgress={this.setProgress}  key="in" pageSize={6} country='in' category={this.props.category}/>}/>
        <Route exact path="/us"element= {<News setProgress={this.setProgress}  key="us" pageSize={6} country='us' category={this.props.category}/>}/>
        <Route exact path="/si"element= {<News setProgress={this.setProgress}  key="si" pageSize={6} country='si' category={this.props.category}/>}/>
        </Routes> */}
      </Router>
        
      </div>
    )
  }
}


