import React from "react";
import { Link } from "react-router-dom";

import Spinner from "../../../layout/Spinner";
import InvoiceItem from "./InvoiceItem";
class InvoiceList extends React.Component {
  filterInvoices = (invoices) => {
    // let filterInvoices = invoices.filter((val, i) => i < 10);
    // return filterInvoices;
    const filterInvoices = invoices.filter((invoice) => {
      return invoice.paidStatus === false;
    });
    return filterInvoices.sort((a, b) => {
      return a.invoiceNum - b.invoiceNum;
    });
  };

  render() {
    const { invoices } = this.props;

    if (invoices) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fas fa-file-invoice-dollar"></i> Recent Invoices
                {""}
              </h2>
              <button
                className="btn btn-outline-dark mb-1 mr-2"
                type="button"
                data-toggle="collapse"
                data-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <Link to="/invoices">
                  <i className="fas fa-file-alt"></i> View All{" "}
                </Link>
              </button>
            </div>
          </div>
          {/* recent invoices */}
          <table className="  table table-sm table-responsive-md  table-bordered table-hover table-striped">
            <thead className="thead-inverse  thead-dark ">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Date</th>
                <th>Due Date</th>

                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            {this.filterInvoices(invoices).map((invoice) => {
              return <InvoiceItem invoice={invoice} key={invoice.id} />;
            })}

            {/* {invoices.map((invoice) => {
              return <InvoiceItem invoice={invoice} />;
            })} */}
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default InvoiceList;
