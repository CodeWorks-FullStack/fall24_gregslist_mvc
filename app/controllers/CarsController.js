import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";

export class CarsController {
  constructor() {
    console.log('Cars controller is loaded 🚗');
    AppState.on('cars', this.drawCars)


    this.drawCars()
  }

  drawCars() {
    const cars = AppState.cars
    console.log('cars in the appstate', cars);
    let carHTMLContent = ''
    cars.forEach(car => carHTMLContent += car.cardHTMLTemplate)
    const carsElem = document.getElementById('car-listings')
    carsElem.innerHTML = carHTMLContent
  }

  createCar() {
    event.preventDefault() // do not refresh the page
    console.log('creating a car!');
    const form = event.target
    console.log('Form that just sumbitted', form);
    // NOTE getFormData will pull all values out of named inputs and construct an object for you
    const carDataFromForm = getFormData(form)
    console.log('car data from form', carDataFromForm);

    carsService.createCar(carDataFromForm)

  }
}