export const recipientHtml = (order) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>COFFE TWIST RECEIPT</title>
      <style>
        *,
        html,
        body {
          box-sizing: border-box;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 16px;
          margin: 0;
        }
        body {
          width: 100vw;
          height: 100vh;
          justify-content: center;
          align-items: center;
        }
        .container {
          display: grid;
          grid-template-rows: repeat(4, auto);
          width: 400px;
          padding: 0 14px 0 20px;
        }
        .grid-box {
          margin: 5px 0;
        }
        .logo {
          padding: 0 50px;
        }
        .delivery-header-holder {
          font-size: 18px;
          display: flex;
          justify-content: space-between;
          color: #a1a1a1;
        }
        .delivery-header {
          font-size: 18px;
          color: #a1a1a1;
          margin-bottom: 4px;
        }
        .order-container {
          border: 1px solid #00000063;
          padding: 2px;
          margin-bottom: 10px;
        }
        .order-container h2 {
          padding: 4px 0 0 2px;
          font-size: 1.4em;
        }
        .order-container ul {
          margin-bottom: 15px;
        }
        .order-container li,
        .address-container li {
          position: relative;
          display: flex;
          list-style-type: none;
        }
        .order-container li {
          align-items: left;
          margin: 10px 0;
        }
        .address-container li {
          align-items: center;
          margin: 6px 0;
        }
        .address-container .info {
          color: #696969;
        }
        .address-container h4 {
          color: #7f7f7f;
        }
        .order-container li img,
        .order-container li svg {
          margin-right: 6px;
        }
        .order-container .info p {
          font-size: 0.8em;
        }
        .order-container h3 {
          font-size: 1.1em;
          font-weight: normal;
          margin: 4px 0;
        }
        .payAmount {
          font-size: 1.3em;
        }
        .tel-img {
          transform: rotateZ(-90deg);
        }
        .address-container {
          border-bottom: 2px solid #f3ebeb;
          align-items: center;
        }
        .address-container h4 {
          font-weight: normal;
        }
        .address-container h4,
        .address-container li,
        .address-container strong {
          font-size: 0.82em;
        }
        .address-container li:first-child {
          font-size: 1em;
        }
        .address-info ul li {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .address-info h1 {
          font-size: 3em;
        }
        .footer p {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.6em;
          color: #565656;
        }
        @media print {
          @page {
              margin-top: 0;
              margin-bottom: 0;
          }
          body {
              padding-top: 72px;
              padding-bottom: 72px ;
          }
      }
      </style>
    </head>
    <body>
      <div>
        <div class="grid-box">
          <div class="header">COFFEE TWIST</div>
          <!-- <div class="header">ΠΡΟΣΟΧΗ ΤΟ ΠΑΡΩΝ ΔΕΝ ΑΠΟΤΕΛΕΙ ΝΟΜΙΜΗ ΑΠΟΔΕΙΞΗ</div> -->
          <div class="header">****** ΠΑΡΑΓΓΕΛΙΑ ******</div>
          <div class="header">
            ***** ${order.CreatedAt.slice(0, 10)} ${order.CreatedAt.slice(
    11,
    19
  )}
            *****
          </div>
          <div class="order-container">
            <h2>*** ΠΑΡΑΓΓΕΛΕΙΑ ${order.ID} ***</h2>
            <ul>
              <li>
                ${
                  order.tips !== 0 ? (
                    <div>TIP ΓΙΑ ΔΙΑΝΟΜΕΑ {order.tips} €</div>
                  ) : (
                    ""
                  )
                }
              </li>
              <li>
                <div>Τηλέφωνο : ${order.phone}</div>
              </li>
              ${order.products.map((product, index) => {
                return `
                  <li key="${index}" elevation="{0}">
                    <div>
                      <span>
                        ${product.quantity + " X " + product.item_name}
                      </span>
                      <span>
                        ${product.total_price / product.quantity + "€"}
                      </span>
                    </div>
                    <ul>
                      ${
                        !!product.option_answers
                          ? product.option_answers.map((option, op_index) => {
                              return `
                              <li key="${op_index}">
                                <span>+ ${option}</span>
                              </li>`;
                            })
                          : ""
                      }
                      ${
                        !!product.extra_ingredients
                          ? product.extra_ingredients.map(
                              (ingredient, op_index) => {
                                return `
                                <li key="${op_index}">
                                  <span>+ ${ingredient}</span>
                                </li>`;
                              }
                            )
                          : ""
                      }
                      ${
                        product.comment !== ""
                          ? `
                        <li key="item_comments">
                          <span>${"Σχόλια : " + product.comment}</span>
                        </li>
                      `
                          : ""
                      }
                    </ul>
                  </li>
                  `;
              })}
            </ul>
            ========================
            <h3>ΤΡΟΠΟΣ ΠΛΗΡΩΜΗΣ : ${order.payment_type}</h3>
            <h3>
              ΤΕΛΙΚΟ ΣΥΝΟΛΟ :
              <strong class="payAmount">${order.after_discount_price.toFixed(
                2
              )}€</strong>
            </h3>
            ========================
          </div>
        </div>
        <div class="grid-box">
          <div class="address-container">
            <h4>##### ΔΙΕΥΘΥΝΣΗ #####</h4>
            <div class="address-info">
              <ul>
                <li>
                  <strong>ΟΝ/ΜΟ :${order.name} ${order.surname}</strong>
                </li>
                <li><strong>ΤΗΛΕΦΩΝΟ :${order.phone}</strong></li>
                <li>
                  <strong
                    >ΟΔΟΣ : ${order.client_address_name}
                    ${order.client_address_number} , ${order.client_area_name} ,
                    ${order.client_zip}
                  </strong>
                </li>
                <li>
                  <strong>ΟΡΟΦΟΣ :${order.floor} </strong>
                </li>
                <li>
                  <strong>ΚΟΥΔΟΥΝΙ :${order.bell_name} </strong>
                </li>
                <h3>ΣΧΟΛΙΑ: ${order.comments}</h3>
              </ul>
            </div>
          </div>
        </div>
        <div class="grid-box">
          <div class="footer">
            <p>###### www.coffeetwist.gr ######</p>
          </div>
        </div>
      </div>
    </body>
  </html>`;
};
