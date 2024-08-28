import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";

export class CarsController {
  constructor() {
    console.log('Cars controller is loaded 🚗');
    // 💂‍♀️ -----> AppState.cars
    AppState.on('cars', this.drawCars)

    carsService.loadCars()
    // this.drawCars() listener will be triggered when pulled out of local storage
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
    const form = event.target // targets the HTML form that just triggered the submission event
    console.log('Form that just sumbitted', form);
    // NOTE getFormData will pull all values out of named inputs and construct an object for you
    const carDataFromForm = getFormData(form)

    console.log('car data from form', carDataFromForm);

    carsService.createCar(carDataFromForm)

    // NOTE this will reset the form after submitting. If there are red squiggles under the form.reset() line, you can ignore them
    // @ts-ignore
    form.reset()
  }

  deleteCar(carId) {

    const wantsToDelete = window.confirm("Are you sure you want to delete this car?")

    // if (wantsToDelete == false)
    if (!wantsToDelete) return

    console.log('Deleting car!', carId);

    carsService.deleteCar(carId)
  }
}