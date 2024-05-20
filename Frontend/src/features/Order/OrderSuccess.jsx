import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartAsync, selectCartId } from "../Cart/cartSlice";
import Button from "../Landing/components/Button";
function OrderSuccess() {
  const params = useParams();
  const cartId = useSelector(selectCartId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emptyCartAsync(cartId));
  }, [dispatch, cartId]);

  return (
    <>
      <main className="grid min-h-full place-items-center mt-10 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-color-1">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-color-5 sm:text-5xl break-all">
            Order Number <span>#{params?.id}</span>
          </h1>

          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in
            <span className="block"> {`>>Profile >>Your Orders`}</span>
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button to="/" className="border border-color-5 rounded-lg">
              Go back home
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccess;
