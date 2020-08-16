import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../index.css';
import { FetchCountries, addCountry } from '../Actions/Actions'
class SmartDropDown extends Component {
    constructor() {
        super();
        this.state = {
            toggleIcon: false,
            countriesList: [],
            currentCountriesList: [],
            itemsOnMore: 0,
            nextItemsFlag: false,
            currentCountryIndex:null,
            currentSelectedItem:"Select a location"
        }
    }
    componentDidMount() {
        this.props.dispatch(FetchCountries());
        this.initialDropdown("45px", "hidden");
        this.nextMoreItems();
    }
    componentDidUpdate(props,state){
        console.log("prev",props);
    }
    static getDerivedStateFromProps(props, state) {
        let currentList = [];
        if (props.countryList.hasOwnProperty("countries")) {
            debugger;
        currentList = props.countryList.countries.filter((d,i) => i <= state.itemsOnMore-1)
        return {
            countriesList : props.countryList.countries,
            currentCountriesList: currentList


        }
    }
    }
    nextMoreItems() {
        this.setState({
            nextItemsFlag: true,
            itemsOnMore: this.state.itemsOnMore + Number(this.props.noOfItems),
        })
    }
    initialDropdown(height, overflow) {
        document.getElementById("setHeight").style.height = height;
        document.getElementById("setHeight").style.overflow = overflow;
    }
    viewItems() {
       // this.initialDropdown("100%", "auto");
        this.setState({
            toggleIcon:!this.state.toggleIcon
        })
        debugger;
        if(this.state.toggleIcon){
            this.initialDropdown("45px","hidden");
            document.getElementById("selectedCountry").innerHTML = this.state.currentSelectedItem
        }
        else{
            document.getElementById("selectedCountry").innerHTML = "Select a location"
            this.initialDropdown("100%","auto");
        }
        
    }
    selectCountry(index,ev){
        debugger;
        this.setState({
            currentCountryIndex:index,
            currentSelectedItem:ev.target.innerHTML
        })
        document.getElementById("selectedCountry").innerHTML = ev.target.innerHTML;
        this.setState({
          toggleIcon:!this.state.toggleIcon
        })
        this.initialDropdown("45px","hidden");
    }
    render() {
        console.log(this.state.currentCountriesList);
        return (
            <div className="dropdown-align">
                <div className="dropdown" id="setHeight">
                    <div className="dropdown-label-caret">
                        <h4 className="dropdown-label" id="selectedCountry">Select a location</h4>
                        <div className="dropdown-caret" onClick={this.viewItems.bind(this)}>{this.state.toggleIcon ? <i class="fa fa-arrow-up" aria-hidden="true"></i> : <i class="fa fa-arrow-down" aria-hidden="true"></i>}</div>
                    </div>
                    <div className="dropdown-search">
                        <div className="search-icon"><i class="fa fa-search" aria-hidden="true"></i></div>
                        <input type="text" className="searchBox" ref="searchItem" />
                    </div>
                    <div className="dropdownList">
                        {
                            this.state.currentCountriesList && this.state.currentCountriesList.map((list,i) => {
                                debugger;
                                return <div className="dropdownlists" key={i} style={this.state.currentCountryIndex==i?{backgroundColor:"grey"}:{backgroundColor:"transparent"}}onClick={this.selectCountry.bind(this,i)}><h4>{list}</h4></div>
                            })

                        }
                        <div><h4 style={{ float: "right", margin: "0px 10px 10px 0px" }} onClick={this.nextMoreItems.bind(this)}>...{this.props.noOfItems} more</h4></div>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        countryList: state.countryList,
        privilege: state.privilege
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SmartDropDown);