import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Orders.css";
import { setOrdersForUser } from "../redux/actions";
import axios from "axios";
import moment from "moment";
import ordersMockdata from "../mockData/ordersMockData.json";
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Navbar,
  Nav,
  NavbarToggler
} from "reactstrap";
import { isEmpty } from "lodash";
import OrdersList from "../components/OrdersList";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount = () => {
    this.props.setOrdersForUser(ordersMockdata);
    if (isEmpty(this.props.selectedUser)) {
      // No selected user
      // this.props.history.push("/");
    } else {
      // Get the orders for a specific user
      // axios
      //   .get(
      //     `https://private-anon-544ac2e9e5-byrd1.apiary-mock.com/orders/${
      //       this.props.selectedUser.id
      //     }`,
      //     {
      //       params: {
      //         start_date: this.props.dateRange.startDate.getTime(),
      //         end_date: this.props.dateRange.endDate.getTime()
      //       }
      //     }
      //   )
      //   .then(response => {
      //     console.log(response);
      //   });
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
    return (
      <div className={`Orders d-flex w-100`}>
        <Navbar className="fixed-top" color="light" light expand="lg">
          <div className="w-100 d-flex justify-content-between">
            <Breadcrumb className="mr-auto">
              <BreadcrumbItem>
                <Link to="/">Search</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{`Orders For User: ${
                this.props.selectedUser.name
              }, From: ${ordersFrom.format(
                dateFormat
              )} Until: ${ordersUntil.format(
                dateFormat
              )} (${numberOfDays} Days), Total Sum: ${this.getCustomerTotalAmount()} `}</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </Navbar>
        <OrdersList ordersList={this.props.list} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dateRange: state.home.dateRange,
  selectedUser: state.home.selectedUser,
  list: state.orders.ordersForUser
});

const mapDispatchToProps = {
  setOrdersForUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
