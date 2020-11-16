//importo moment per gestire la data
import moment from 'moment';

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
    /**NEL CASO DELLA DATE:
     * nel caso della data devo definire un get con una readableDate() che è una funzione JS
     * che ci permette in seguito di richiamare la date negli altri componenti
     */

    get readableDate() {
        /**PRIMO METODO PER GESTIRE LA DATA:
         *   return this.date.toLocaleDateString('en-EN',{
             year:'numeric',
             month:'long',
             day:'numeric',
             hour:'2-digit',
             minute:'2-digit'
         })*/

         return moment(this.date).format('MMMM Do YYYY, hh:mm');
        }
      }
      
      export default Order;
      
      