import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { DateRange } from "react-date-range";
import { find } from "lodash";
import mockUsers from "../mockData/usersMockData.json";

import { dateRangeSelection, userSelection, setUsers } from "../redux/actions";

class Home extends Component {
  componentDidMount = () => {
    this.getUsersFromAPI()
  }
  
  handleSelect = ranges => {
    this.props.dateRangeSelection(ranges.selection);
  };

  getUsersFromAPI = () => {
    // TODO: Will be a async call to the API
    this.props.setUsers(mockUsers);
  };

  handleSubmit = e => {
    e.preventDefault();
    const formUserSelectionName = e.target[0].value;
    const selectedUser = find(
      this.props.users,
      user => user.name === formUserSelectionName
    );
    this.props.userSelection(selectedUser);
    this.props.history.push("/orders");
  };
  render() {
    const usersToSelectOptions = this.props.users.map((user, userIndex) => {
      return <option key={userIndex}>{user.name}</option>;
    });
    return (
      <Form onSubmit={this.handleSubmit} className="container-fluid">
        <FormGroup>
          <Label for="usersSelection">Select a user</Label>
          <Input type="select" name="user" id="usersSelection">
            {usersToSelectOptions}
          </Input>
        </FormGroup>
        <DateRange
          ranges={[this.props.dateRange]}
          onChange={this.handleSelect}
        />
        <FormGroup />
        <Button>Search</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  dateRange: state.home.dateRange,
  users: state.home.users
});

const mapDispatchToProps = {
  dateRangeSelection,
  userSelection,
  setUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
