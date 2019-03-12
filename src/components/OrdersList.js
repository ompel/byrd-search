import React, { Component } from "react";
import { connect } from "react-redux";
import OrderCard from "./OrderCard";
// import NoResults from './NoResults';

class OrdersList extends Component {
  render() {
    const ordersList = this.props.ordersList.map((order, id) => (
      <div key={id} className="card-item  m-2">
        <OrderCard {...order} />
      </div>
    ));
    return (
      <div className="d-flex w-100">
        <div className="d-flex flex-row flex-wrap justify-content-left p-2 OrdersList w-100">
          {ordersList.length > 0 ? ordersList : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ordersList: state.orders.ordersForUser
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersList);
