import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import LineItems from "./LineItems";
import Spinner from "../layout/Spinner";

import uuidv4 from "uuid/v4";
import * as moment from "moment";
import "moment-recur";
import styles from "./Invoice.module.scss";

class Invoice extends Component {
  locale = "en-US";
  currency = "USD";

  state = {
    taxRate: 0.0,
    dateArray: [],
    lineItems: [
      {
        id: "initial", // react-beautiful-dnd unique key
        name: "",
        description: "",
        quantity: 0,
        price: 0.0,
      },
    ],
  };

  handleInvoiceChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item;
      return { ...item, [event.target.name]: event.target.value };
    });
    this.setState({ lineItems });
  };

  handleAddLineItem = (event) => {
    this.setState({
      // use optimistic uuid for drag drop; in a production app this could be a database id
      lineItems: this.state.lineItems.concat([
        { id: uuidv4(), name: "", description: "", quantity: 0, price: 0.0 },
      ]),
    });
  };

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i;
      }),
    });
  };

  handleReorderLineItems = (newLineItems) => {
    this.setState({
      lineItems: newLineItems,
    });
  };

  handleFocusSelect = (event) => {
    event.target.select();
  };

  handlePayButtonClick = () => {
    alert("Not implemented");
  };

  formatCurrency = (amount) => {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  static getDerivedStateFromProps(props, state) {
    //setting state or set the date
  }

  componentDidMount() {
    let now = moment().format("LLL");

    //set the date
    let firstDay = new Date();

    let nextMonth = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth(),
      firstDay.getDate()
    );
    let events = moment(nextMonth)
      .recur()
      .every("monday")
      .daysOfWeek()
      .weeksOfMonthByDay();

    let dateArray = events.next(4, "MM/DD/YYYY");
    let newDateState = [dateArray];
    this.setState({
      dateArray: newDateState[0],
    });
  }

  // calcTaxAmount = (c) => {
  //   return c * (this.state.taxRate / 100);
  // };

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce(
      (prev, cur) => prev + cur.quantity * cur.price,
      0
    );
  };

  // calcTaxTotal = () => {
  //   return this.calcLineItemsTotal() * (this.state.taxRate / 100);
  // };

  calcGrandTotal = () => {
    const { client } = this.props;
    return this.calcLineItemsTotal() + 25 * client.quantity;
  };

  render = () => {
    const { index, name, description, quantity, price } = this.props;

    const { client } = this.props;

    console.log("day: ", this.state.dateArray[0]);
    if (client) {
      return (
        <div className={styles.invoice}>
          <div className="row mb-6">
            <div className="col-sm-5">
              <h5 className="mb-1">From:</h5>
              <img
                src="../Doremi.jpg"
                className="img-fluid rounded"
                alt="Invoice logo"
              />
            </div>
            <div className="col-sm-3"></div>
            <div className="col-sm-4 space-between">
              <h5 className="mb-3">To:</h5>
              <h4 className="text-dark mb-1">
                {" "}
                {client.firstName.charAt(0).toUpperCase() +
                  client.firstName.slice(1)}{" "}
                {client.lastName.charAt(0).toUpperCase() +
                  client.lastName.slice(1)}
              </h4>
              <div>{client.streetAddress}</div>
              <div>
                {client.city}, {client.state}, {client.postalCode}
              </div>
              <div>Email: {client.email}</div>
              <div>Phone: {client.phone}</div>
            </div>
          </div>
          <h2>Invoice</h2>

          <LineItems
            items={this.state.lineItems}
            client={client}
            currencyFormatter={this.formatCurrency}
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
            deleteHandler={this.handleRemoveLineItem}
            reorderHandler={this.handleReorderLineItems}
          />

          <div className={styles.totalContainer}>
            <form>
              {/* <div className={styles.valueTable}>
                <div className={styles.row}>
                  <div className={styles.label}>Tax Rate (%)</div>
                  <div className={styles.value}>
                    <input
                      name="taxRate"
                      type="number"
                      step="0.01"
                      value={this.state.taxRate}
                      onChange={this.handleInvoiceChange}
                      onFocus={this.handleFocusSelect}
                    />
                  </div>
                </div>
              </div> */}
            </form>
            <form>
              <div className={styles.valueTable}>
                {/* <div className={styles.row}>
                  <div className={styles.label}>Subtotal</div>
                  <div className={`${styles.value} ${styles.currency}`}>
                    {this.formatCurrency(this.calcLineItemsTotal())}
                  </div>
                </div> */}
                {/* <div className={styles.row}>
                  <div className={styles.label}>Tax ({this.state.taxRate}%)</div>
                  <div className={`${styles.value} ${styles.currency}`}>
                    {this.formatCurrency(this.calcTaxTotal())}
                  </div>
                </div> */}
                <div className={styles.row}>
                  <div className={styles.label}>Total Due</div>
                  <div className={`${styles.value} ${styles.currency}`}>
                    {this.formatCurrency(this.calcGrandTotal())}
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.pay}>
            <button
              className={styles.payNow}
              onClick={this.handlePayButtonClick}
            >
              Print
            </button>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  };
}

export default compose(
  firestoreConnect((props) => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0],
  }))
)(Invoice);