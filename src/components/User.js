import React, { Component } from 'react';
import SmartDropDown from './SmartDropDown';
import { connect } from 'react-redux';

class User extends Component {
    constructor(){
        super();
        this.state={
            privilege:null
        }
    }
    componentDidMount(){
        this.props.dispatch({
            type:"privilegeFlag",
            payload:false
        })
        
    }
    static getDerivedStateFromProps(props, state) {
        return{
            privilege:props.privilege
        }
    }
    
    render() {
     
        return (
            <div>
                <SmartDropDown Privilege={this.props.privilege} noOfItems="5"/>
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

export default connect(mapStateToProps,mapDispatchToProps)(User);
