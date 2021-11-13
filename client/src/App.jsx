import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Table from './components/Table';
import logo from './logo.webp';
//import profitOrders from './profitorders.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: 'EN-US',
    }
    this.setLang = this.setLang.bind(this);
  }

  setLang(e) {
    this.setState({lang: e.target.value});
  }

  render() {
    return (
      <div className = 'App'>

        <Header lang={this.state.lang} changeLang={this.setLang}/>
        <a href=""><img id='logo' className='center-img' src={logo} alt='Albion Sniper Logo' title='Albion Sniper Home'/></a>
        <Table 
          lang={this.state.lang} 
          checkedLocations={this.state.checkedLocations} 
          filterLocations={this.filterLocations}
          />
        <Footer />

      </div>
    );
  }

}

export default App;
