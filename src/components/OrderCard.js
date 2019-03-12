import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter
} from "reactstrap";
import OrderItem from "./OrderItem";
import "./OrderCard.css";
import moment from "moment";

class OrderCard extends Component {
  getTotalForOrder = orderItems => {
    let total = 0;
    orderItems.forEach(order => {
      total += Number(order.total_price.amount);
    });

    return total;
  };

  getItemsForOrder = () => {
    return this.props.items.map(item => <OrderItem key={item.id} {...item} />);
  };

  render() {
    const {
      recipient,
      charge_customer,
      items,
      created_at,
      delivery
    } = this.props;
    return (
      <Card className="OrderCard text-center">
        <div id="card-overlay">
          <div className="h-100 d-flex justify-content-center align-items-center overlay-content">
            {/* <FontAwesomeIcon icon="edit" /> */}
          </div>
        </div>
        <CardHeader>
          <CardTitle>{`To: ${recipient.name}`}</CardTitle>
          <CardSubtitle>{`Email: ${recipient.email}`}</CardSubtitle>
          <CardSubtitle>{`Created at: ${moment(created_at).format(
            "DD/MM/YY HH:mm"
          )}`}</CardSubtitle>
        </CardHeader>
        <CardBody>{this.getItemsForOrder()}</CardBody>
        <CardFooter>
          {`Total Amount: ${this.getTotalForOrder(items)} ${
            charge_customer.currency
          }`}
          <br />
          {`${delivery.method} delivery by ${delivery.courier}`}
        </CardFooter>
      </Card>
    );
  }
}

export default OrderCard;
