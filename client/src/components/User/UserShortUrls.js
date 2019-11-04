import React, { Component } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";

import AuthService from "./../AuthService";

const tableIcons = {
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class UserShortUtils extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.AuthService = new AuthService();
    this.deleteShortUrl = this.deleteShortUrl.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    const token = this.AuthService.getToken();
    this.loadData(token);
  }

  loadData(token) {
    axios
      .get(`/api/v1/url_shorts`, { headers: { Authorization: token } })
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({ errorMessage: "Does Not Exist" });
        } else {
          this.setState({ errorMessage: "There is an error. Please Retry." });
        }
      });
  }

  deleteShortUrl(shortUrl) {
    const token = this.AuthService.getToken();
    axios
      .delete(`/api/v1/url_shorts/${shortUrl}`, {
        headers: { Authorization: token }
      })
      .then(_response => {
        alert("You deleted " + shortUrl);
      })
      .catch(_error => {
        alert("Deleting " + shortUrl + " failed.");
      })
      .finally(this.loadData(token));
  }

  render() {
    const options = {
      search: false,
      paging: false,
      sorting: false
    };
    return (
      <MaterialTable
        title="List of Short URLs"
        icons={tableIcons}
        options={options}
        columns={[
          { title: "Short URL", field: "short_url" },
          { title: "Full URL", field: "full_url" }
        ]}
        data={this.state.data}
        actions={[
          {
            icon: DeleteOutline,
            tooltip: "Delete",
            onClick: (event, rowData) => this.deleteShortUrl(rowData.short_url)
          }
        ]}
      />
    );
  }
}

export default UserShortUtils;
