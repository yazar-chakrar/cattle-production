import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCow, saveCow } from "../services/cowService";
class CowForm extends Form {
  state = {
    data: {
      cowregnumber: "",
      cowbreedId: "",
      cowdate: "",
    },
    breeds: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    registerNumber: Joi.number().required().label("Register Number"),
    dateIn: Joi.number().label("Date In"),
    breedId: Joi.string().required().label("Breed"),
  };
  componentDidMount() {
    const breeds = ["Montbeliard", "Holstein"];
    this.setState({ breeds });

    //const cowId = this.props.match.params.id;
    const cowId = "new";
    if (cowId === "new") return;

    const cow = getCow(cowId);
    if (!cow) return this.props.history.replace("not-found");

    this.setState({ data: this.mapToViewModel(cow) });
  }

  mapToViewModel(cow) {
    return {
      _id: cow._id,
      registerNumber: cow.registerNumber,
      dateIn: cow.dateIn,
      breedId: cow.breedId,
    };
  }

  doSubmit = () => {
    saveCow(this.state.data);
    this.props.history.push("/cows");
  };

  render() {
    return (
      <div>
        <h1>Add cow</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("regNumber", "Register Number")}
          {this.renderSelect("breedId", "Breed", [
            { "._id": "001", name: "Montbeliard" },
            { "._id": "002", name: "Holstein" },
          ])}
          {this.renderInput("dateIn", "Date In", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CowForm;
