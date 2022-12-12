import React, { Component } from "react";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { deleteConslt, getConslts } from "./../services/consltsService";
import ConsltsTable from "./consultationsTable";

class Consults extends Component {
  state = {
    conslts: [],
    pageSize: 5,
    currentPage: 1,
  };

  async componentDidMount() {
    const { data } = await getConslts();
    console.log(data);
    this.setState({
      conslts: data,
    });
  }

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  handleDelete = async (conslt) => {
    const originalConslts = this.state.conslts;
    console.log(originalConslts);
    const conslts = originalConslts.filter((m) => m._id !== conslt._id);
    this.setState({ conslts: conslts });

    try {
      await deleteConslt(conslt._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This consultation has already been deleted.");

      this.setState({ conslts: originalConslts });
    }
  };
  render() {
    const count = this.state.conslts.length;
    const { pageSize, currentPage, conslts } = this.state;

    if (count === 0) return <p>There are no consultation registred.</p>;

    const consltsPage = paginate(conslts, currentPage, pageSize);
    return (
      <div className="col">
        <h3>Registred consultations</h3>
        <Link
          to="/conslts/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Conultation
        </Link>
        <p>
          {" "}
          Showing {consltsPage.length} consultation from {conslts.length}{" "}
          registred births.{" "}
        </p>
        <ConsltsTable consltsPage={consltsPage} onDelete={this.handleDelete} />
        <Pagination
          itemsCount={conslts.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
export default Consults;
