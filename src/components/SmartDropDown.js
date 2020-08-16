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
            currentCountryIndex: null,
            currentSelectedItem: "Select a location",
            onSearch: false,
            itemsOnMoreSearch: 5,
            totalListOnSearch: []
        }
    }
    componentDidMount() {
        this.props.dispatch(FetchCountries());
        this.initialDropdown("45px", "hidden");
        this.nextMoreItems();
    }
    componentDidUpdate(props, state) {
        console.log("prev", props);
    }
    static getDerivedStateFromProps(props, state) {
        let currentList = [];
        if (props.countryList.hasOwnProperty("countries") && !state.onSearch) {
            debugger;
            currentList = props.countryList.countries.filter((d, i) => i <= state.itemsOnMore - 1)
            return {
                countriesList: props.countryList.countries,
                currentCountriesList: currentList
            }
        }
        if (state.onSearch && state.itemsOnMoreSearch >= 5) {
            let currentListOnSearch = state.totalListOnSearch.filter((d, i) => i <= state.itemsOnMoreSearch - 1)
            debugger;
            return {
                currentCountriesList: currentListOnSearch
            }
        }
        debugger;
        console.log(state.currentCountriesList);
    }
    nextMoreItems() {
        if (!this.state.onSearch) {
            this.setState({
                itemsOnMore: this.state.itemsOnMore + Number(this.props.noOfItems),
            })
        }
        else {
            this.setState({
                itemsOnMoreSearch: this.state.itemsOnMoreSearch + Number(this.props.noOfItems),
            })
        }
    }
    initialDropdown(height, overflow) {
        document.getElementById("setHeight").style.height = height;
        document.getElementById("setHeight").style.overflow = overflow;
    }
    viewItems() {
        // this.initialDropdown("100%", "auto");
        this.setState({
            toggleIcon: !this.state.toggleIcon
        })
        debugger;
        if (this.state.toggleIcon) {
            this.initialDropdown("45px", "hidden");
            document.getElementById("selectedCountry").innerHTML = this.state.currentSelectedItem
        }
        else {
            this.state.onSearch = false;
            this.refs.searchItem.value = "";
            document.getElementById("selectedCountry").innerHTML = "Select a location"
            this.initialDropdown("100%", "auto");
        }

    }
    selectCountry(index, ev) {
        debugger;
        this.setState({
            currentCountryIndex: index,
            currentSelectedItem: ev.target.innerHTML
        })
        document.getElementById("selectedCountry").innerHTML = ev.target.innerHTML;
        this.setState({
            toggleIcon: !this.state.toggleIcon
        })
        this.initialDropdown("45px", "hidden");
    }
    searchCountry(ev) {
        debugger;
        let currentDisplayList = [];
        let currentList = this.props.countryList.countries.filter((d) => d.includes(ev.target.value))
        currentDisplayList = currentList.filter((d, i) => i <= 4)
       
        this.setState({
            onSearch: true,
            totalListOnSearch: currentList,
            currentCountriesList: currentDisplayList
        })
        // if(currentDisplayList.length==0){
        //     debugger;
        //     document.getElementById("searchCountryName").innerHTML = ev.target.value;
        // }
        // this.setState({
        //     onSearch:true
        // })
    }
    addNewCountry(){
            this.initialDropdown("45px", "hidden");
            this.state.toggleIcon = false;
            document.getElementById("selectedCountry").innerHTML = this.refs.searchItem.value
        this.props.addAndSelectHandler(this.props.countryList,this.refs.searchItem.value);
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
                        <input type="text" className="searchBox" ref="searchItem" onChange={this.searchCountry.bind(this)} />
                    </div>
                    <div className="dropdownList">
                        {
                            this.state.currentCountriesList && this.state.currentCountriesList.map((list, i) => {
                                debugger;
                                return <div className="dropdownlists" key={i} style={this.state.currentCountryIndex == i ? { backgroundColor: "grey" } : { backgroundColor: "transparent" }} onClick={this.selectCountry.bind(this, i)}><h4>{list}</h4></div>
                            })

                        }
                        {console.log(this.state.totalListOnSearch.length - this.state.currentCountriesList.length)}
                        {(!this.state.onSearch && this.props.countryList.hasOwnProperty("countries") && this.props.countryList.countries.length - this.state.currentCountriesList.length > 0) || (this.state.totalListOnSearch.length - this.state.currentCountriesList.length > 0) ? <div><h4 style={{ float: "right", paddingRight: "20px" }} onClick={this.nextMoreItems.bind(this)}>...{this.props.noOfItems} more</h4></div> : null}
                        {
                            this.state.onSearch && this.state.currentCountriesList.length==0 ?
                                <div style={{ display: "flex" }}>
                                    <h4 style={{ width: "60%",textAlign:"center" }} id="searchCountryName">"{this.refs.searchItem.value}"not found</h4>
                                    <button style={!this.props.privilege?{display:"none"}:{display:"block",marginRight:"10px"}}onClick={this.addNewCountry.bind(this)}>Add and Select</button>
                                </div>
                                : null
                        }
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