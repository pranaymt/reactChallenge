import React, { Component } from 'react';
import SmartDropDown from './SmartDropDown';
import { connect } from 'react-redux';
import {FetchCountries,addCountry} from '../Actions/Actions'

class Admin extends Component {
    constructor(){
        super();
        this.state={
            privilege:null
        }
    }
    componentDidMount(){
        this.props.dispatch({
            type:"privilegeFlag",
            payload:true
        })
        
    }
    static getDerivedStateFromProps(props, state) {
        return{
            privilege:props.privilege
        }
    }
    addSelectHandler(AddedItem){
        this.props.dispatch({
            type:"AddSelect",
            payload:AddedItem
        })
    }
    render() {
     
        return (
            <div>
                <SmartDropDown Privilege={this.props.privilege} noOfItems="5" addAndSelectHandler = {this.addSelectHandler.bind(this)}/>
            </div>
        )
    }
}
const mapStateToProps =(state)=>{
    return{
        noOfItems:state.noOfItems,
        privilege:state.privilege
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        dispatch:dispatch

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);
