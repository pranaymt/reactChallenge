import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../index.css';
import {FetchCountries,addCountry} from '../Actions/Actions'
class SmartDropDown extends Component {
    constructor(){
        super();
        this.state = {
            toggleIcon:false,
            countriesList:[],
            currentCountriesList:[],
            itemsOnMore:0,
            nextItemsFlag:false
        }
    }
    componentDidMount(){
        this.initialDropdown("45px","hidden");
        this.nextMoreItems();
    }
    static getDerivedStateFromProps(props, state) {
        debugger;
        var countryListing = props.countryList.countries;
        if(props.countryList && props.countryList.countries){
            
        var currentList = countryListing.splice(1,state.itemsOnMore)
       console.log(currentList);
    }
        return{
            countriesList:props.countryList.countries,
            currentCountriesList:currentList
        }
    }
    nextMoreItems(){
       this.setState({
           nextItemsFlag:true,
           itemsOnMore:this.state.itemsOnMore+Number(this.props.noOfItems)
       })
    }
    initialDropdown(height,overflow){
        document.getElementById("setHeight").style.height = height;
        document.getElementById("setHeight").style.overflow = overflow;
    }
    viewItems(){
        this.setState({
            toggleIcon:!this.state.toggleIcon
        })
        debugger;
        if(this.state.toggleIcon){
            this.initialDropdown("45px","hidden");
           
        }
        else{
            this.initialDropdown("100%","auto");
        }
    }
    render() {
        debugger;
        console.log(this.state.currentCountriesList);
        return (
            <div className="dropdown-align"> 
                <div className="dropdown" id="setHeight">
                    <div className="dropdown-label-caret">
                        <h4 className="dropdown-label" >Select a location</h4>
                        <div className="dropdown-caret" onClick={this.viewItems.bind(this)}>{this.state.toggleIcon?<i class="fa fa-arrow-down" aria-hidden="true"></i>:<i class="fa fa-arrow-up" aria-hidden="true"></i>}</div>
                    </div>
                    <div className="dropdown-search">
                    <div className="search-icon"><i class="fa fa-search" aria-hidden="true"></i></div>
                        <input type="text" className="searchBox" ref="searchItem"/>
                    </div>
                    <div className="dropdownList" style={{overflowY:"auto"}}>
                    {
                        this.state.currentCountriesList && this.state.currentCountriesList.map((list)=>{
                        return<div className="dropdownlists"><h4>{list}</h4></div>
                        })
                        
                    }
                    <div><h4 style={{float:"right",marginBottom:"10px"}} onClick={this.nextMoreItems.bind(this)}>...{this.props.noOfItems} more</h4></div>
                </div>
                </div>
               
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return{
        countryList:state.countryList,
        privilege:state.privilege
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        dispatch:dispatch
    }
   
}

export default connect(mapStateToProps,mapDispatchToProps)(SmartDropDown);