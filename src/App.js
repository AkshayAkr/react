import React, { Component } from 'react';
import './index.css';
import SignedInRoutes from './components/SignedInRoutes'
import Footer from './components/Footer';

class App extends Component {
  
  render() {
    return (
      <div>
        <main id="content" className="p-5">
      <SignedInRoutes />
    </main>
    <Footer/>
      </div>
        
    )
  }
}

export default App;
