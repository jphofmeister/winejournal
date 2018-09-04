import React, { Component } from 'react';
import WineForm from './WineForm';
import WineList from './WineList';
import MoreWineOptions from './MoreWineOptions';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wine: {
        wineName: '',
        winery: '',
        wineType: '',
        notes: '',
        varietal: '',
        tasteDate: ''
      },
      areOptionsHidden: true,
      isFormHidden: true,
      wineList: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  toggleForm() {
    this.setState({
      isFormHidden: !this.state.isFormHidden
    });
  }

  toggleOptions() {
    this.setState({
      areOptionsHidden: !this.state.areOptionsHidden
    });
  }

  onChange(forProperty, newValue) {
    let { wine } = this.state;

    let newWine = {
      ...wine,
      [forProperty]: newValue
    };

    this.setState({
      wine: newWine
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    let { wine } = this.state;

    this.setState({
      wineList: [
        ...this.state.wineList,
        this.state.wine
      ],
      wine: {
        wineName: '',
        winery: '',
        wineType: '',
        notes: '',
        varietal: '',
        tasteDate: ''
      },
      isFormHidden: true,
      areOptionsHidden: true
    });
  }

  onReset = (event) => {
    this.setState({
      isFormHidden: true,
      areOptionsHidden: true
    });
  }

  render() {
    return (
      <main>

        {!this.state.isFormHidden &&
          <form onSubmit={this.onSubmit} onReset={this.onReset}>
            <WineForm
              onChange={this.onChange}
              wineName={this.state.wine.wineName}
              winery={this.state.wine.winery}
              wineType={this.state.wine.wineType}
              notes={this.state.wine.notes}
              varietal={this.state.wine.varietal} />

            <a href="#"
              className="expand-link"
              onClick={this.toggleOptions}>
              More Options
            </a>

            {!this.state.areOptionsHidden &&
              <MoreWineOptions
                onChange={this.onChange}
                tasteDate={this.state.wine.tasteDate} />
            }

            <input type="submit" value="SUBMIT" />
            <input type="reset" value="CANCEL" />
          </form>
        }

        <section>
          <button
            className="open-wine-form"
            onClick={this.toggleForm}>
            + Add Wine
          </button>

          <WineList wineList={this.state.wineList} />
        </section>
      </main>
    );
  }
}

export default Main;