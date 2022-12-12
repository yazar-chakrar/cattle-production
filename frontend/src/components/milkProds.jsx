import React, { Component } from "react";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import { deleteMilkProd, getMilkProds } from "./../services/milkProdService";
import MilkProdsTable from "./milkProdsTable";

class MilkProds extends Component {
  state = {
    milkProds: [],
    pageSize: 5,
    currentPage: 1,
  };

  async componentDidMount() {
    const { data } = await getMilkProds();
    console.log(data);
    this.setState({
      milkProds: data,
    });
  }

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  handleDelete = async (milkProd) => {
    const originalMilkProds = this.state.milkProds;
    console.log(originalMilkProds);
    const milkProds = originalMilkProds.filter((m) => m._id !== milkProd._id);
    this.setState({ milkProds: milkProds });

    try {
      await deleteMilkProd(milkProd._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This production has already been deleted.");

      this.setState({ milkProds: originalMilkProds });
    }
  };
  render() {
    const count = this.state.milkProds.length;
    const { pageSize, currentPage, milkProds } = this.state;

    if (count === 0) return <p>There are no production registred.</p>;

    const milkProdsPage = paginate(milkProds, currentPage, pageSize);
    return (
      <div className="col">
        <h3>Registred milk production per day.</h3>
        <Link
          to="/milk-prod/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Production
        </Link>
        <p>
          {" "}
          Showing {milkProdsPage.length} production from {milkProds.length}{" "}
          registred productions.{" "}
        </p>
        <MilkProdsTable
          MilkProdsPage={milkProdsPage}
          onDelete={this.handleDelete}
        />
        <Pagination
          itemsCount={milkProds.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
export default MilkProds;
