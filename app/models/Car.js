import { generateId } from "../utils/GenerateId.js"

export class Car {
  // NOTE we will pass through a single object when newing up this car class
  /**
   * @param {{ make: String; model: String; year: Number; price: Number; color: String; imgUrl: String; description?: String; transmission: String; mileage: Number; listedAt?: String }} data
   */
  constructor(data) {
    this.id = generateId() // creates a unique identifier for each class object so they can be easily identified

    this.model = data.model
    this.make = data.make
    this.year = data.year
    this.transmission = data.transmission
    this.color = data.color
    this.imgUrl = data.imgUrl
    this.mileage = data.mileage
    this.price = data.price
    this.description = data.description

    // NOTE if no arguments are passed through the Date constructor, it will default to your computer's date and time
    // NOTE this checks to see if the car already has a date saved to it (it came from local storage), or if needs to have a date assigned it (it came from a form submission)
    this.listedAt = data.listedAt == undefined ? new Date() : new Date(data.listedAt)

    // REVIEW equivalent to the ternary operator above
    // if (data.listedAt == undefined) {
    //   this.listedAt = new Date()
    // }
    // else {
    //   this.listedAt = new Date(data.listedAt)
    // }
  }

  get cardHTMLTemplate() {
    return /*html*/`
     <div class="col-12 p-0 mb-3">
      <div class="row bg-light shadow car-border" style="border-color: ${this.color};">
        <div class="col-md-4 p-0">
          <img class="img-fluid car-img"
            src="${this.imgUrl}"
            alt="${this.year} ${this.make} ${this.model}">
        </div>
        <div class="col-md-8">
          <div class="p-2">
            <p class="fs-3">
            ${this.year} ${this.make} ${this.model}
            <i onclick="app.CarsController.deleteCar('${this.id}')" class="mdi mdi-delete-forever text-danger" role="button" title="Delete this ${this.make} ${this.model}"></i>
            </p>
            <p class="fs-4">
             Listed on ${this.listedDate} at ${this.listedTime} 
            </p>
            <p class="fs-4">$${this.priceAsCurrency}</p>
            <p>${this.description}</p>
            <p class="fs-3">
              ${this.transmissionIcon}
            </p>
            <p>${this.mileage} miles</p>
          </div>
        </div>
      </div>
    </div>
    `
  }

  get listedDate() {
    return this.listedAt.toLocaleDateString()
  }
  get listedTime() {
    return this.listedAt.toLocaleTimeString()
  }

  get transmissionIcon() {
    if (this.transmission == 'manual') {
      return '<i class="mdi mdi-car-shift-pattern" title="Manual Transmission"></i>'
    }
    if (this.transmission == 'automatic') {
      return '<i class="mdi mdi-refresh-auto" title="Automatic Transmission"></i>'
    }
    return '<i class="mdi mdi-help" title="Unknown Transmission"></i>'
  }

  get priceAsCurrency() {
    return new Intl.NumberFormat().format(this.price)
  }
}
