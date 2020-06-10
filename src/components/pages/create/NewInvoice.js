import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Vendor
// import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { isLoaded } from "react-redux-firebase";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Spinner from "../../layout/Spinner";

// Custom
// import Header from "../../header/Header";
import { InvoiceContainer } from "../../styledComponents/newInvoice/NewInvoiceContainer";
import ProductList from "./ProductList";
import { createInvoice } from "../../../redux/actions/invoiceActions";

// Component
function NewInvoice(props) {
  const { id } = useParams();
  const { handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const client = useSelector(
    (state) => state.firestore.data.clients && state.firestore.data.clients[id]
  );

  //Format Invoice Num and Append Zeros to is
  let invNum = id.slice(0, 6);
  let address = "";
  let name = "";
  let email = "";
  let phone = "";

  const [invoiceMeta, setInvoiceMeta] = useState({
    invoiceDate: new Date(),
    dueDate: new Date(),
    companyAddress: "5430 Jimmy Carter Blvd #112, Norcross, GA 30093",
    companyName: "Doremi Music",
  });

  if (client) {
    address =
      client.streetAddress +
      ", " +
      client.city +
      ", " +
      client.state +
      ", " +
      client.postalCode;
    name = client.firstName + " " + client.lastName;
    email = client.email;
    phone = client.phone;
  } else {
    return <Spinner />;
  }
  // Controlling Some Inputs
  // const handleInvoiceMeta = (e) => {
  //   setInvoiceMeta({ ...invoiceMeta, [e.target.name]: e.target.value });
  // };
  const handleDueDateChange = (e) => {
    setInvoiceMeta({ ...invoiceMeta, dueDate: e._d });
  };
  const handleInvoiceDateChange = (e) => {
    setInvoiceMeta({ ...invoiceMeta, invoiceDate: e._d });
  };

  // Submiting Invoice Details
  const handleInvoiceSubmit = (metaData) => {
    const handleDataSubmit = (data) => {
      const finalObj = {
        ...data,
        ...metaData,
        dueDate: invoiceMeta.dueDate,
        invoiceDate: invoiceMeta.invoiceDate,
        paidStatus: false,
        remindedAt: new Date(),
        invoiceNum: invNum,
        clientName: name,
        clientId: "",
        address: address,
        phone: phone,
        email: email,
      };
      dispatch(createInvoice(finalObj));
    };

    handleSubmit(handleDataSubmit)();
  };

  return (
    <div>
      {/* <Header title={"Add New Invoice"} /> */}
      <InvoiceContainer>
        <h3>INVOICE</h3>

        <Grid item xs={12} sm={6} md={6} lg={4}>
          <div className="textfield-container">
            <p className="invoice-title">Invoice Details</p>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="dense"
                id="date-picker-dialog"
                label="Date"
                name="Date"
                error={errors.itemName && true}
                helperText={errors.itemName && "Invalid Input"}
                size="small"
                fullWidth
                inputVariant="outlined"
                format="MM/DD/YYYY"
                value={invoiceMeta.invoiceDate}
                onChange={handleInvoiceDateChange}
                name="invoiceDate"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                margin="dense"
                id="due-date-picker-dialog"
                label="Due Date"
                name="Due Date"
                size="small"
                fullWidth
                inputVariant="outlined"
                format="MM/DD/YYYY"
                value={invoiceMeta.dueDate}
                onChange={handleDueDateChange}
                name="dueDate"
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            {/* <TextField
              label="# Invoice Number"
              name="invoiceNumber"
              inputRef={{
                required: true,
                minLength: 2,
              }}
              error={errors.invoiceNumber && true}
              helperText={errors.invoiceNumbery && "Invalid Input"}
              size="small"
              fullWidth
              variant="outlined"
              margin="dense"
              value={invNum}
            /> */}
            Invoice Number: {invNum}
          </div>
        </Grid>

        {/* Product List */}
        <ProductList
          invoiceMeta={invoiceMeta}
          handleInvoiceSubmit={handleInvoiceSubmit}
        />
      </InvoiceContainer>
    </div>
  );
}

export default NewInvoice;