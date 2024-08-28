import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { loadState, saveState } from "../utils/Store.js"

class CarsService {
  deleteCar(carId) {
    const cars = AppState.cars

    // NOTE findIndex returns the index number of an item instead of the entire item in an array
    const carIndex = cars.findIndex(car => car.id == carId)

    // REVIEW always test a splice with the middle item in an array (not the first and not the last)!
    // NOTE the first argument passed to splice is the index that we want to start splicing at
    // the second argument passed to splice is how many items to remove after the index number

    cars.splice(carIndex, 1) // 💂‍♀️! triggers listener

    this.saveCars()
  }
  createCar(carFormData) {
    const cars = AppState.cars

    // make sure we turn the POJO (plain old javascript object) from the form into a Car before it goes into the AppState
    const newCar = new Car(carFormData)

    cars.push(newCar) // 💂‍♀️! triggers listener

    this.saveCars()
  }

  saveCars() {
    // NOTE saveState is a utility to save data into local storage. 
    // The first argument passed to saveState is the key that we are saving to in local storage(where we are saving it to local storage)
    // The second argument is what we are saving to local storage
    saveState('cars', AppState.cars)
  }

  loadCars() {
    // NOTE loadState pulls data out of local storage
    // the first argument is which key we want to pull data of local storage (where we want to pull data out)
    // the second argument is what we want to convert the data into (in this case, we want to convert the data into an array of Car objects)
    const carsFromLocalStorage = loadState('cars', [Car])

    AppState.cars = carsFromLocalStorage // 💂‍♀️! triggers listener
  }
}

export const carsService = new CarsService()