import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { DateRange } from "react-date-range";
import "./Home.css";
import { find } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// import mockUsers from "../mockData/usersMockData.json"; // Used for dev
import Load from "../components/Load";

import {
  dateRangeSelection,
  customerSelection,
  setCustomers
} from "../redux/actions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount = () => {
    sessionStorage.removeItem("selectedCustomer");
    sessionStorage.removeItem("dateRange");
    this.getCustomersFromAPI();
  };

  handleSelect = ranges => {
    this.props.dateRangeSelection(ranges.selection);
  };

  getCustomersFromAPI = () => {
    if (!this.props.customers.length > 0) {
      axios
        .get("https://private-anon-eebdf53ad3-byrd1.apiary-mock.com/customers")
        .then(response => {
          this.props.setCustomers(response.data);
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
    // this.props.setCustomers(mockUsers);
    // this.setState({ loading: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.customers.length > 0) {
      const formCustomerSelectionName = e.target[0].value;
      const selectedCustomer = find(
        this.props.customers,
        customer => customer.name === formCustomerSelectionName
      );
      this.props.customerSelection(selectedCustomer);
      // Save required data to sessionStorage, to enable persistence
      sessionStorage.setItem(
        "selectedCustomer",
        JSON.stringify(selectedCustomer)
      );
      sessionStorage.setItem("dateRange", JSON.stringify(this.props.dateRange));
      this.props.history.push("/orders");
    }
  };
  render() {
    const customersToSelectOptions = this.props.customers.map(
      (customer, customerIndex) => {
        return <option key={customerIndex}>{customer.name}</option>;
      }
    );
    if (!this.state.loading) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="customersSelection">Select a customer</Label>
            <Input type="select" name="customer" id="customersSelection">
              {customersToSelectOptions}
            </Input>
          </FormGroup>
          <DateRange
            ranges={[this.props.dateRange]}
            onChange={this.handleSelect}
          />
          <FormGroup />
          <Button disabled={!this.props.customers.length > 0}>
            {`Search  `}
            <FontAwesomeIcon icon="search" />
          </Button>
        </Form>
      );
    } else {
      return <Load loadingText="Loading..." />;
    }
  }
}

const mapStateToProps = state => ({
  dateRange: state.home.dateRange,
  customers: state.home.customers
});

const mapDispatchToProps = {
  dateRangeSelection,
  customerSelection,
  setCustomers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
