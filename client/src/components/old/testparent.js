import React, { Component } from 'react';
import { Input, Col } from 'reactstrap';
//import { isToday } from 'date-fns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDay, getDay, deleteFoodFromDay } from '../../actions/dayActions';
import { getFoods, deleteFood } from '../../actions/foodActions';

import FoodIngredientTable from '../common/FoodIngredientTable';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';

import TodayChild from './TodayChild';

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().slice(0, 10),
      foodEaten: [],
      calories: 0
    }

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onDeleteFoodFromDay = this.onDeleteFood.bind(this);
    this.onDeleteFood = this.onDeleteFood.bind(this);
    this.onAddFoodToDay = this.onAddFoodToDay.bind(this);
    this.updateDay = this.updateDay.bind(this);
  }

  componentDidMount() {
    this.props.getFoods();

    let newDate = this.state.date;
    this.props.getDay(newDate);

    // const foodEaten = day.foodEaten.join(',');

    // day.date = !isEmpty(day.date) ? day.date : newDate;
    // day.calories = !isEmpty(day.calories) ? day.calories : 0;

    // this.setState({
    //   date: day.date,
    //   foodEaten: foodEaten,
    //   calories: day.calories
    // });
  }

  onChangeDate(newDate) {
    this.setState({ date: newDate }, this.props.getDay(newDate));
  }

  onAddFoodToDay(id, foodCal, e) {
    e.preventDefault();

    let newCalories = this.state.calories + foodCal;

    this.setState({
      foodEaten: [...this.state.foodEaten, id],
      calories: newCalories
    });

    this.updateDay();
  }

  updateDay() {
    const dayData = {
      date: this.state.day,
      foodEaten: this.state.foodEaten,
      calories: this.state.calories
    }

    this.props.addDay(dayData);
  }

  onDeleteFoodFromDay(id) {
    let date = this.state.date;
    this.props.deleteFoodFromDay(date, id);
  }

  onDeleteFood(id) {
    this.props.deleteFood(id);
  }

  render() {
    const { day } = this.props.day;
    const { foods } = this.props.food;
    const foodHeadings = ['Foods', 'Calories', ''];

    let foodContent;

    if (foods === null || this.props.food.loading) {
      foodContent = <Spinner />
    } else {
      foodContent = <FoodIngredientTable items={foods} headings={foodHeadings} onAddClick={this.onAddFoodToDay} onDeleteClick={this.onDeleteFood} />
    }

    return (
      <div className="card-style">
        <TodayChild day={day} date={this.state.date}
         onChange={this.onChangeDate} onDeleteClick={this.onDeleteFoodFromDay} />
        {foodContent}
      </div>
    )
  }
}

Today.propTypes = {
  getFoods: PropTypes.func.isRequired,
  deleteFood: PropTypes.func.isRequired,
  addDay: PropTypes.func.isRequired,
  getDay: PropTypes.func.isRequired,
  deleteFoodFromDay: PropTypes.func,
  day: PropTypes.object,
  days: PropTypes.array
}

const mapStateToProps = state => ({
  day: state.day,
  food: state.food
})

export default connect(mapStateToProps, { getFoods, deleteFood, addDay, getDay, deleteFoodFromDay })(Today);
