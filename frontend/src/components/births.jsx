import React, { Component } from "react";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { deleteBirth, getBirths } from "./../services/birthService";
import BirthsTable from "./birthsTable";

class Births extends Component {
  state = {
    births: [],
    pageSize: 5,
    currentPage: 1,
  };

  async componentDidMount() {
    const { data } = await getBirths();
    console.log(data);
    this.setState({
      births: data,
    });
  }

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  handleDelete = async (birth) => {
    const originalBirths = this.state.births;
    console.log(originalBirths);
    const births = originalBirths.filter((m) => m._id !== birth._id);
    this.setState({ births: births });

    try {
      await deleteBirth(birth._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This movie has already been deleted.");

      this.setState({ births: originalBirths });
    }
  };
  render() {
    const count = this.state.births.length;
    const { pageSize, currentPage, births } = this.state;

    if (count === 0) return <p>There are no Cows registred.</p>;

    const birthsPage = paginate(births, currentPage, pageSize);
    return (
      <div className="col">
        <h3>Registred births</h3>
        <Link
          to="/births/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Birth
        </Link>
        <p>
          {" "}
          Showing {birthsPage.length} birth from {births.length} registred
          births.{" "}
        </p>
        <BirthsTable birthsPage={birthsPage} onDelete={this.handleDelete} />
        <Pagination
          itemsCount={births.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
export default Births;
