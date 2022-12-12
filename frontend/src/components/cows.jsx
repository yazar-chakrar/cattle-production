import React, { Component } from "react";
import { getCows, deleteCow } from "../services/cowService";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import CowsTable from "./cowsTable";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";

class Cows extends Component {
  state = {
    breeds: [],
    cows: [],
    pageSize: 5,
    currentPage: 1,
    selectedBreed: null,
  };

  handleDelete = async (cow) => {
    const originalCows = this.state.cows;
    console.log(originalCows);
    const cows = originalCows.filter((m) => m._id !== cow._id);
    this.setState({ cows: cows });

    try {
      await deleteCow(cow._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This movie has already been deleted.");

      this.setState({ movies: originalCows });
    }
  };

  async componentDidMount() {
    const { data } = await getCows();
    console.log(data);
    this.setState({
      breeds: ["Montbeliard", "Holstein"],
      cows: data,
    });
  }

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };

  handleBreedSelect = (breed) => {
    console.log(breed);
    this.setState({ selectedBreed: breed, currentPage: 1 });
  };

  render() {
    console.log(this.state.cows);
    const count = this.state.cows.length;
    const { pageSize, currentPage, cows: allCows, selectedBreed } = this.state;

    const filteredCows = selectedBreed
      ? allCows.filter((c) => c.breed === selectedBreed)
      : allCows;

    if (count === 0) return <p>There are no Cows registred.</p>;

    const cowsPage = paginate(filteredCows, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.breeds}
            onItemSelect={this.handleBreedSelect}
            textProperty="name"
            valueProperty="._id"
            selectedItem={this.state.selectedBreed}
          />
        </div>
        <div className="col">
          <Link
            to="/cows/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New cow
          </Link>
          <p>
            {" "}
            Showing {cowsPage.length} cows from {filteredCows.length} registred
            cows.{" "}
          </p>
          <CowsTable cowsPage={cowsPage} onDelete={this.handleDelete} />
          <Pagination
            itemsCount={filteredCows.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Cows;
