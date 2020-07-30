import moment from 'moment'

class OrderItems {
    constructor(id, items, totalAmt, date) {

        this.id = id
        this.items = items
        this.totalAmt = totalAmt
        this.date = date

    }

    get readableDate(){
        return moment(this.date).format('MMMM Do YYYY, hh:mm')
    }
}



export default OrderItems