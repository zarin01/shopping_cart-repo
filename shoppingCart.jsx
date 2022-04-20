function ShoppingCart({ availableItems }) {
  const { Button } = ReactBootstrap;

  const [stock, setStock] = React.useState(availableItems);
  const [cart, setCart] = React.useState([]);
  const moveToCart = (e) => {
    let [product, numInStock] = e.target.innerHTML.split(":");
    if (numInStock <= 0) return; // zero items in stock
    let item = stock.filter((item) => item.product == product);
    let newStock = stock.map((item) => {
      if (item.product == product) {
        item.inStock--;
      }
      return item;
    });
    setStock([...newStock]);

    setCart([...cart, ...item]);
    console.log(`Cart: ${JSON.stringify(cart)}`);
  };

  const availableItemsButtons = availableItems.map((item, index) => {
    return (
      <Button id={item.product} key={index} onClick={moveToCart}>
        {item.product}:{item.inStock}
      </Button>
    );
  });

  return (
    <>
      <ul key="stock" style={{ listStyleType: "none" }}>
        {availableItemsButtons}
      </ul>
      <h1>Shopping Cart</h1>
      <Cart cartitems={cart}> Cart Items</Cart>
    </>
  );
}

function Cart({ cartitems }) {
  const { Button } = ReactBootstrap;
  console.log("rendering Cart");
  const availableItemsButtons = cartitems.map((item, index) => {
    return (
      <Button id={item.product} key={index}>
        {item.product}
      </Button>
    );
  });
  return (
    <ul id="cart-items" style={{ listStyleType: "none" }} key="cart">
      {availableItemsButtons}
    </ul>
  );
}

const availableItems = [
  { product: "Jacket", inStock: 2 },
  { product: "Pants", inStock: 3 },
  { product: "Scarf", inStock: 0 },
  { product: "Pajamas", inStock: 3 },
  { product: "Shirt", inStock: 1 },
];

ReactDOM.render(
  <ShoppingCart availableItems={availableItems} />,
  document.getElementById("root")
);
