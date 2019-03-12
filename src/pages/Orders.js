import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Orders.css";
import {
  setOrdersForCustomer,
  dateRangeSelection,
  customerSelection
} from "../redux/actions";
import axios from "axios";
import moment from "moment";
// import ordersMockdata from "../mockData/ordersMockData.json"; // Used for dev
import { Breadcrumb, BreadcrumbItem, Navbar } from "reactstrap";
import OrdersList from "../components/OrdersList";
import Load from "../components/Load";
import NoResults from "../components/NoResults";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount = () => {
    // this.props.setOrdersForCustomer(ordersMockdata);
    // this.setState({ loading: false });
    const selectedCustomer = JSON.parse(
      sessionStorage.getItem("selectedCustomer")
    );
    const dateRange = JSON.parse(sessionStorage.getItem("dateRange"));
    dateRange.startDate = new Date(dateRange.startDate);
    dateRange.endDate = new Date(dateRange.endDate);


    if (this.props.selectedCustomer || (selectedCustomer && dateRange)) {
      // We have the required data in order to fetch the customer orders
      this.props.dateRangeSelection(dateRange);
      this.props.customerSelection(selectedCustomer);
      // Get the orders for a specific user
      axios
        .get(
          `https://private-anon-544ac2e9e5-byrd1.apiary-mock.com/orders/${selectedCustomer.id ||
            this.props.selectedUser.id}`,
          {
            params: {
              start_date: this.props.dateRange.startDate.getTime(),
              end_date: this.props.dateRange.endDate.getTime()
            }
          }
        )
        .then(response => {
          this.setState({ loading: false });
          this.props.setOrdersForCustomer(response.data);
        });
    } else {
      // No selected user
      this.props.history.push("/");
    }
  };

  getCustomerTotalAmount = () => {
    // Assuming that the rest of the orders for the same cusotmer have the same currency
    const customerCurrency =
      (this.props.list[0] &&
        this.props.list[0].charge_customer &&
        this.props.list[0].charge_customer.currency) ||
      "";
    let total = 0;

    this.props.list.map(order => {
      total += parseInt(order.charge_customer.total_price);
    });

    return `${total} ${customerCurrency}`;
  };

  render() {
    const ordersFrom = moment(this.props.dateRange.startDate);
    const ordersUntil = moment(this.props.dateRange.endDate);
    const numberOfDays = ordersUntil.diff(ordersFrom, "days");
    const dateFormat = "DD/MM/YY";
    if (!this.state.loading) {
      return (
        <div
          className={`Orders d-flex w-100 ${
            this.props.list.length > 0 ? "" : "justify-content-center"
          }`}
        >
          <Navbar className="fixed-top" color="light" light expand="lg">
            <div className="w-100 d-flex justify-content-between">
              <Breadcrumb className="mr-auto">
                <BreadcrumbItem>
                  <Link to="/">Search</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{`Orders For User: ${
                  this.props.selectedCustomer.name
                }, From: ${ordersFrom.format(
                  dateFormat
                )} Until: ${ordersUntil.format(
                  dateFormat
                )} (${numberOfDays} Days), Total Sum: ${this.getCustomerTotalAmount()} `}</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Navbar>
          {this.props.list.length > 0 ? (
            <OrdersList ordersList={this.props.list} />
          ) : (
            <NoResults />
          )}
        </div>
      );
    } else {
      return <Load loadingText="Loading..." />;
    }
  }
}

const mapStateToProps = state => ({
  dateRange: state.home.dateRange,
  selectedCustomer: state.home.selectedCustomer,
  list: state.orders.ordersForCustomer
});

const mapDispatchToProps = {
  setOrdersForCustomer,
  customerSelection,
  dateRangeSelection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
