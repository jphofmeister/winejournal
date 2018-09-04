const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWineInput(data) {
    let errors = {};

    data.wineName = !isEmpty(data.wineName) ? data.wineName : '';
    data.winery = !isEmpty(data.winery) ? data.winery : '';
    data.wineType = !isEmpty(data.wineType) ? data.wineType : '';
    data.varietal = !isEmpty(data.varietal) ? data.varietal : '';

    if (Validator.isEmpty(data.wineName)) {
        errors.wineName = 'Wine Name is required';
    }

    if (Validator.isEmpty(data.winery)) {
        errors.winery = 'Winery is required';
    }

    if (Validator.isEmpty(data.wineType)) {
        errors.wineType = 'Wine Type is required';
    }

    if (Validator.isEmpty(data.varietal)) {
        errors.varietal = 'Varietal is required';
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}