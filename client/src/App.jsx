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
      checkedLocations: {
        buy: new Set(['Thetford',"Morgana's Rest","Lymhurst","Forest Cross","Merlyn's Rest","Bridgewatch","Highland Cross","Black Market","Martlock","Caerleon","Fort Sterling","Arthur's Rest"]),
        sell: new Set(['Thetford',"Morgana's Rest","Lymhurst","Forest Cross","Merlyn's Rest","Bridgewatch","Highland Cross","Black Market","Martlock","Caerleon","Fort Sterling","Arthur's Rest"])
      }
      //not sure yet
    }

    this.setLang = this.setLang.bind(this);
    this.filterLocations = this.filterLocations.bind(this);

  }

  setLang(e) {
    this.setState({lang: e.target.value});
  }

  filterLocations(e) {
    e.preventDefault();
    
  }

  render() {
    return (
      <div className = 'App'>

        <Header lang={this.state.lang} changeLang={this.setLang}/>
        <img id='logo' classname='center-img' src={logo} alt='Albion Sniper Logo'/>
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
