import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from '../common/Spinner';
import WineInfo from './WineInfo';
import EditWine from './EditWine';
import { getWine, deleteWine } from '../../actions/wineActions';

class WinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditForm: false
    }

    this.toggleOptions = this.toggleOptions.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    this.props.getWine(this.props.match.params.id);
  }

  toggleOptions(newValue) {
    this.setState({
      showEditForm: newValue
    });
  }

  onDeleteClick(id) {
    this.props.deleteWine(id, this.props.history);
  }

  render() {
    const { wine, loading } = this.props.wine;

    let wineContent;

    if (wine === null || loading) {
      wineContent = <Spinner />
    } else {
      if (this.state.showEditForm === false) {
        wineContent = <WineInfo
          wine={wine}
          onClick={this.toggleOptions}
          showEditForm={this.state.showEditForm}
          onDeleteClick={this.onDeleteClick} />
      } else {
        wineContent = <EditWine wine={wine} onClick={this.toggleOptions} showEditForm={this.state.showEditForm} />
      }
    }

    return (
      <div>
        {wineContent}
      </div>
    )
  }
}

WinePage.propTypes = {
  getWine: PropTypes.func.isRequired,
  deleteWine: PropTypes.func.isRequired,
  wine: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  wine: state.wine
});

export default connect(mapStateToProps, { getWine, deleteWine })(withRouter(WinePage));